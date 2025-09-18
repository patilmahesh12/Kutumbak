import dbConfig from "@/middleware/db.config";
import Family from "@/models/Family";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

dbConfig();

export async function POST(req: NextRequest) {
  const { user } = await req.json();
  const familyExist = await Family.findOne({ email: user.email });
  if (familyExist) {
    console.log(familyExist);
    return NextResponse.json(
      { error: "Family already exists!" },
      { status: 404 }
    );
  }
  const hashedPassword = bcrypt.hashSync(user.password, 10);
  const profileImage = `https://avatar.iran.liara.run/public/${
    user.gender === "Male" ? "boy" : "girl"
  }`;
  const newUser = new User({
    fullName: user.fullName,
    dob: user.dob,
    gender: user.gender,
    caste: user.caste,
    aadhar: user.aadhar,
    mobileNo: user.mobileNo,
    profileImage: profileImage,
  });
  const newFamily = new Family({
    familyName: user.familyName,
    community: user.caste,
    members: [newUser._id],
    address: user.address,
    email: user.email,
    password: hashedPassword,
  });
  try {
    await newUser.save();
    await newFamily.save();
    return NextResponse.json({ message: "User registered successfully!" });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to register user." },
      { status: 500 }
    );
  }
}
