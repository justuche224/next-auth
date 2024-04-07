import bcrypt from "bcryptjs";
import User from "@/models/User";
import connect from "@/utils/db";
import { NextResponse } from "next/server";

export const POST = async (request: any) => {
  const { password, email } = await request.json();

  await connect();

  const existingUser = await User.findOne({ email });

  if (!existingUser) {
    console.log("Invalid Token");

    return new NextResponse("Invalid Token", { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(password, 5);
  existingUser.password = hashedPassword;
  existingUser.resetToken = undefined;
  existingUser.resetTokenExpiry = undefined;

  try {
    await existingUser.save();
    console.log("saved");

    return new NextResponse("Password reset succesful", { status: 200 });
  } catch (err: any) {
    console.error(err);
    return new NextResponse(err, {
      status: 500,
    });
  }
};
