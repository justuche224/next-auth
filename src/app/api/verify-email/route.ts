import User from "@/models/User";
import connect from "@/utils/db";
import { NextResponse } from "next/server";
// import jwt from "jsonwebtoken";

export const GET = async (request: any) => {
  const token = request.nextUrl.searchParams.get("token");
  console.log("veryfy started");

  await connect();

  try {
    const user = await User.findById(token);

    if (!user) {
      return new NextResponse(
        { message: "Invalid verification link" },
        { status: 400 }
      );
    }

    user.isVerified = true;
    await user.save();
    console.log("Email verified successfully");

    return new NextResponse(
      { message: "Email verified successfully" },
      { status: 200 }
    );
  } catch (error) {
    return new NextResponse(
      { message: "Verification Failed" },
      { status: 400 }
    );
  }
};
