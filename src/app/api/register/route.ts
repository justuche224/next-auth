import User from "@/models/User";
import connect from "@/utils/db";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import Mailgun from "mailgun.js";
import FormData, { from } from "form-data";

const API_KEY = process.env.MAILGUN_API_KEY || "";
const DOMAIN = process.env.MAILGUN_DOMAIN || "";

export const POST = async (request: any) => {
  const { email, password } = await request.json();

  await connect();
  console.log("start");

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return new NextResponse("Email is already in use", { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(password, 5);
  const newUser = new User({
    email,
    password: hashedPassword,
    isVerified: false,
  });

  try {
    await newUser.save();
    console.log("saved");

    const mailgun = new Mailgun(FormData);
    const client = mailgun.client({ username: "api", key: API_KEY });

    const messageData = {
      from: "Mailgun Sandbox <postmaster@sandbox3c33c07a88f242559c9f4b941ff47f98.mailgun.org>",
      to: email,
      subject: "Please verify your email",
      text: "Please verify your email",
      html: `<b>Please verify your email by clicking on the following link:</b><br><a href="${process.env.CLIENT_URL}/verify-email?token=${newUser._id}">Verify Email</a>`,
    };
    await client.messages.create(DOMAIN, messageData);

    return new NextResponse("user is registered", { status: 200 });
  } catch (err: any) {
    console.error(err);
    return new NextResponse(err, {
      status: 500,
    });
  }
};
