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

    // console.log("Date primite:", {
    //   fullname,
    //   email,
    //   phone,
    //   location,
    //   car,
    //   carImage,
    //   startDate,
    //   endDate,
    //   pickUpTime,
    //   returnTime,
    //   pricePerDay,
    //   totalPrice,
    //   totalRentals,
    // });

    // Convert date strings to Date objects
    const newStartDate = new Date(startDate);
    const newEndDate = new Date(endDate);

    // Fetch all rentals for the same car
    const existingRentals = await Rental.find({ car });

    // Function to check if two date ranges overlap
    const isDateOverlap = (start1, end1, start2, end2) => {
      return start1 <= end2 && end1 >= start2;
    };

    // Check for overlaps with existing rentals
    for (const rental of existingRentals) {
      const existingStartDate = new Date(rental.startDate);
      const existingEndDate = new Date(rental.endDate);

      if (
        isDateOverlap(
          newStartDate,
          newEndDate,
          existingStartDate,
          existingEndDate
        )
      ) {
        return NextResponse.json({
          success: false,
          message: "Masina nu este disponibila pentru data aleasa",
        });
      }
    }

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

    return new NextResponse({
      status: 200,
      body: { success: true },
    });
  } catch (error) {
    console.log("Eroare în timpul procesării cererii:", error);
    return NextResponse.json({
      success: false,
      message: "An error occurred",
      errorDetails: error.message,
    });
  }
}
