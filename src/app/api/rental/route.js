import { NextResponse } from "next/server";
import { connectMongoDB } from "/utils/mongodb";
import Rental from "/models/Rental";

export async function POST(request) {
  try {
    await connectMongoDB();
    const {
      fullname,
      email,
      phone,
      location,
      car,
      carImage,
      startDate,
      endDate,
      pickUpTime,
      returnTime,
      pricePerDay,
      totalPrice,
    } = await request.json();

    console.log("Date primite:", {
      fullname,
      email,
      phone,
      location,
      car,
      carImage,
      startDate,
      endDate,
      pickUpTime,
      returnTime,
      pricePerDay,
      totalPrice,
    });

    const newRental = new Rental({
      fullname,
      email,
      phone,
      location,
      car,
      carImage,
      startDate,
      endDate,
      pickUpTime,
      returnTime,
      pricePerDay,
      totalPrice,
    });
    await newRental.save();
    console.log("Datele au fost salvate cu succes în baza de date!");

    return NextResponse.json({ success: true });
  } catch (error) {
    console.log("Eroare în timpul procesării cererii:", error);
    return NextResponse.json({ success: false });
  }
}
