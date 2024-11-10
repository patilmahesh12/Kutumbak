import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
  const { updatedMember } = await req.json();
  try {
    const member = await User.findByIdAndUpdate(
      updatedMember._id,
      updatedMember
    );
    return NextResponse.json(member);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update family member." },
      { status: 500 }
    );
  }
}
