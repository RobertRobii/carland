import { NextResponse } from "next/server";
import { connectMongoDB } from "/utils/mongodb";
import Rental from "/models/Rental";

export async function GET() {
  try {
    await connectMongoDB();
    const allCars = await Rental.find();
    const topPicks = allCars.filter((car) => car.totalRentals >= 5);
    return NextResponse.json({ topPicks });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false });
  }
}
