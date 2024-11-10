import bcrypt from "bcryptjs";
import Family from "@/models/Family";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import dbConfig from "@/middleware/db.config";

dbConfig();

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();
  const family = await Family.findOne({ email }).populate("members");
  if (!family) {
    return NextResponse.json("Invalid credentials", { status: 401 });
  }
  if (!comparePassword(password, family.password)) {
    return NextResponse.json("Invalid credentials", { status: 401 });
  }
  const data = {
    id: family._id,
    email: family.email,
    name: family.name,
  };
  const response = NextResponse.json({ message: "Logged in", family: family });
  const token = generateToken(data);
  setTokenCookie(response, token);
  return response;
}

const comparePassword = (password: string, hashedPassword: string) => {
  return bcrypt.compareSync(password, hashedPassword);
};

const generateToken = (data: object) => {
  return jwt.sign(data, process.env.JWT_SECRET!, { expiresIn: "1d" });
};

const setTokenCookie = (response: NextResponse, token: string) => {
  response.cookies.set("token", token, {
    httpOnly: true,
    maxAge: 60 * 60 * 24,
  });
};
