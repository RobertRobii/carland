import { NextResponse } from "next/server";
import { connectMongoDB } from "/utils/mongodb";
import Rental from "/models/Rental";

export async function GET() {
  try {
    await connectMongoDB();
    const rentals = await Rental.find();
    return NextResponse.json({ rentals });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ success: false });
  }
}
