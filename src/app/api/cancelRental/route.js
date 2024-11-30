import { NextResponse } from "next/server";
import { connectMongoDB } from "/utils/mongodb";
import Rental from "/models/Rental";

export async function DELETE(request, response) {
  response.setHeader("Cache-Control", "no-store, max-age=0");
  try {
    await connectMongoDB();

    const req = await request.json();
    const { rentalId } = req;

    await Rental.findByIdAndDelete(rentalId);

    return NextResponse.json({
      success: true,
      message: "Rental cancelled successfully",
    });
  } catch (error) {
    console.error("Error cancelling rental:", error);
    return NextResponse.json({
      success: false,
      message: "Failed to cancel rental",
    });
  }
}
