import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import dbConfig from "@/middleware/db.config";
import Family from "@/models/Family";

dbConfig();

export async function GET(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  if (!token) {
    return NextResponse.json({ error: "No token found" }, { status: 401 });
  }
  if (!process.env.JWT_SECRET) {
    return NextResponse.json(
      { error: "Server configuration error: JWT_SECRET missing" },
      { status: 500 }
    );
  }

  try {
    const data = jwt.verify(token, process.env.JWT_SECRET);
    if (typeof data !== "object" || !("email" in data)) {
      return NextResponse.json(
        { error: "Invalid token payload" },
        { status: 403 }
      );
    }
    const family = await Family.findOne({
      email: (data as jwt.JwtPayload).email,
    }).populate("members");
    if (!family) {
      return NextResponse.json({ error: "Family not found" }, { status: 404 });
    }

    return NextResponse.json({ family });
  } catch (err: unknown) {
    console.log(err);
    const errorMessage =
      err instanceof Error && err.name === "JsonWebTokenError"
        ? "Invalid token"
        : "Token verification failed";
    return NextResponse.json({ error: errorMessage }, { status: 403 });
  }
}
