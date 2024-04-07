import User from "@/models/User";
import connect from "@/utils/db";
import { NextResponse } from "next/server";
import crypto from "crypto";

export const POST = async (request: any) => {
  const { resetToken } = await request.json();
  console.log("token retrieved");
  console.log(resetToken);

  await connect();

  const hashedToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  console.log("token retrieved");
  console.log(hashedToken);

  const user = await User.findOne({ resetToken: hashedToken });
  console.log(user);

  if (!user) {
    console.log("Invalid Token");

    return new NextResponse("Invalid Token", { status: 400 });
  }
  if (user.resetTokenExpiry <= Date.now()) {
    console.log("Expired Token");

    return new NextResponse("Expired Token", { status: 400 });
  }
  console.log("sussces");

  return new NextResponse(JSON.stringify(user), { status: 200 });
};
