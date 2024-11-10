import Family from "@/models/Family";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { community } = await req.json();
  const families = await Family.find({ community }).populate("members");
  return NextResponse.json(families);
}
