import { NextResponse } from "next/server";
import { connectMongoDB } from "/utils/mongodb";
import Review from "/models/Review";

export async function POST(request) {
  try {
    await connectMongoDB();

    const requestBody = await request.json();

    const { id, reviewMessage, fullname, isEdited } = requestBody;

    await Review.findByIdAndUpdate(id, {
      reviewMessage,
      fullname,
      isEdited: true,
      postedDate: new Date(),
    });

    console.log("Date primite:", { id, reviewMessage, fullname, isEdited });

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
