import { NextResponse } from "next/server";
import { connectMongoDB } from "/utils/mongodb";
import Review from "/models/Review";

export async function PUT(request) {
  try {
    await connectMongoDB();
    const {} = await request.json();

    return NextResponse.json({
      success: true,
      message: "Review updated successfully",
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      success: false,
      message: "Error updating review",
    });
  }
}
