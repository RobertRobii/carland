import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectMongoDB } from "/utils/mongodb";
import User from "/models/User";

export async function POST(request) {
  const { firstname, lastname, email, password } = await request.json();

  try {
    await connectMongoDB();
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      firstname,
      lastname,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false });
  }
}
