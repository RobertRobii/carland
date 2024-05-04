import { NextResponse } from "next/server";
import { connectMongoDB } from "/utils/mongodb";
import Review from "/models/Review";

export async function GET() {
  try {
    await connectMongoDB();
    const reviews = await Review.find({});
    return NextResponse.json({ reviews });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false });
  }
}
