import { NextResponse } from "next/server";
import User from "/models/User";
import { connectMongoDB } from "/utils/mongodb";

export const POST = async (request) => {
  try {
    await connectMongoDB();

    const { email } = await request.json();
    const user = await User.findOne({ email }).select("_id");
    console.log(user);

    return NextResponse.json({ user });
  } catch (error) {
    console.log(error);
  }
};
