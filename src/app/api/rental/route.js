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
      totalRentals,
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
      totalRentals,
    });

    // Check if any rentals exist with the same car name
    const existingRentals = await Rental.find({ car });

    // Update totalRentals for all existing rentals
    if (existingRentals.length > 0) {
      await Rental.updateMany({ car }, { $inc: { totalRentals: 1 } });
    }

    // Retrieve the updated totalRentals for the new rental
    const updatedExistingRentals = await Rental.find({ car });
    const updatedTotalRentals =
      updatedExistingRentals.length > 0
        ? updatedExistingRentals[0].totalRentals
        : totalRentals;

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
      totalRentals: updatedTotalRentals,
    });

    await newRental.save();
    console.log("Datele au fost salvate cu succes în baza de date!");

    return NextResponse.json({ success: true });
  } catch (error) {
    console.log("Eroare în timpul procesării cererii:", error);
    return NextResponse.json({ success: false });
  }
}
