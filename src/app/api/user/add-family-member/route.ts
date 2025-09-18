import Family from "@/models/Family";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { memberData, family } = await req.json();
  const familyExists = await Family.findOne({ _id: family._id });
  if (!familyExists) {
    return NextResponse.json({ message: "Family not found" }, { status: 404 });
  }
  const profileImage = `https://avatar.iran.liara.run/public/${
    memberData.gender === "Male" ? "boy" : "girl"
  }`;
  try {
    const newFamilyMember = new User({
      ...memberData,
      profileImage,
    });
    await newFamilyMember.save();
    familyExists.members.push(newFamilyMember._id);
    await familyExists.save();
    return NextResponse.json({ message: "Family member added successfully" });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to add family member" },
      { status: 500 }
    );
  }
}
