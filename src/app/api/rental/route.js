export async function POST(request) {
  try {
    await connectMongoDB();
    const rentalData = await request.json();
    console.log("Received rental data:", rentalData);

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
    } = rentalData;

    const newStartDate = new Date(startDate);
    const newEndDate = new Date(endDate);

    const existingRentals = await Rental.find({ car });
    console.log("Existing rentals:", existingRentals);

    const isDateOverlap = (start1, end1, start2, end2) =>
      start1 <= end2 && end1 >= start2;

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
        console.log("Date overlap detected!");
        return NextResponse.json({
          success: false,
          message: "Masina nu este disponibila pentru data aleasa",
        });
      }
    }

    if (existingRentals.length > 0) {
      await Rental.updateMany({ car }, { $inc: { totalRentals: 1 } });
    }

    const updatedTotalRentals =
      existingRentals.length > 0
        ? (await Rental.findOne({ car })).totalRentals
        : totalRentals;

    const newRental = new Rental({
      ...rentalData,
      startDate: newStartDate,
      endDate: newEndDate,
      totalRentals: updatedTotalRentals,
    });

    await newRental.save();
    console.log("Rental saved successfully!");

    return NextResponse.json({ success: true });
  } catch (error) {
    console.log("Error processing request:", error);
    return NextResponse.json({
      success: false,
      message: "An error occurred",
      errorDetails: error.message,
    });
  }
}
