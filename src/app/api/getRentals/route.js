import { NextResponse } from "next/server";
import { connectMongoDB } from "/utils/mongodb";
import Rental from "/models/Rental";

export async function GET(response) {
  response.setHeader("Cache-Control", "no-store, max-age=0");
  try {
    await connectMongoDB();
    const rentals = await Rental.find({});
    return NextResponse.json({ rentals });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false });
  }
}
