import { NextResponse } from "next/server";
import { connectMongoDB } from "/utils/mongodb";
import Review from "/models/Review";

export async function DELETE(request) {
  try {
    await connectMongoDB();

    const req = await request.json();
    const { reviewId } = req;

    await Review.findByIdAndDelete(reviewId);

    return NextResponse.json({
      success: true,
      message: "Review deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting review:", error);
    return NextResponse.json({
      success: false,
      message: "Failed to delete review",
    });
  }
}
