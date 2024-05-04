import { NextResponse } from "next/server";
import { connectMongoDB } from "/utils/mongodb";
import Review from "/models/Review";

export async function POST(request) {
  try {
    await connectMongoDB();
    const { fullname, email, reviewMessage } = await request.json();

    console.log("Date primite:", {
      fullname,
      email,
      reviewMessage,
    });

    const newReview = new Review({
      fullname,
      email,
      reviewMessage,
    });
    await newReview.save();
    console.log("Datele au fost salvate cu succes în baza de date!");

    return NextResponse.json({ success: true });
  } catch (error) {
    console.log("Eroare în timpul procesării cererii:", error);
    return NextResponse.json({ success: false });
  }
}
