import User from "@/models/User";
import connect from "@/utils/db";
import { NextResponse } from "next/server";
import Mailgun from "mailgun.js";
import FormData from "form-data";
import crypto from "crypto";

const API_KEY = process.env.MAILGUN_API_KEY || "";
const DOMAIN = process.env.MAILGUN_DOMAIN || "";

export const POST = async (request: any) => {
  const { email } = await request.json();

  await connect();

  const existingUser = await User.findOne({ email });

  if (!existingUser) {
    return new NextResponse("Email does not exist", { status: 400 });
  }

  const resetToken = crypto.randomBytes(20).toString("hex");
  console.log("token before sending to email");
  console.log(resetToken);

  const passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  console.log("passwordResetToken before sending to email");
  console.log(passwordResetToken);

  const passwordResetTokenExpires = Date.now() + 3600000;

  existingUser.resetToken = passwordResetToken;

  existingUser.resetTokenExpiry = passwordResetTokenExpires;

  const resetUrl = `${process.env.CLIENT_URL}/reset-password?resetToken=${resetToken}`;

  try {
    await existingUser.save(); // Use await here

    const mailgun = new Mailgun(FormData);
    const client = mailgun.client({ username: "api", key: API_KEY });

    const messageData = {
      from: "Mailgun Sandbox <postmaster@sandbox3c33c07a88f242559c9f4b941ff47f98.mailgun.org>",
      to: email,
      subject: "Password Reset",
      text: "Password Reset",
      html: `<div>
                  Hi ${email},
                  <br>
                  You recently requested to reset the password for your ${process.env.CLIENT_URL} account. Click the button below to proceed.
                  <br>
                  <a href="${resetUrl}">Reset password</a>
                  <br>
                  If you did not request a password reset, please ignore this email. This password reset link is only valid for the next <b>1 hour</b>.
                  <br>
                  Thanks, the ${process.env.CLIENT_URL} team
              </div>`,
    };
    await client.messages.create(DOMAIN, messageData);
    console.log("sent");

    return new NextResponse("user is registered", { status: 200 });
  } catch (err: any) {
    console.error(err);
    return new NextResponse(err, { status: 500 });
  }
};
