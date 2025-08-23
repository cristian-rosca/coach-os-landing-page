import { Resend } from "resend";
import jwt, { JwtPayload } from "jsonwebtoken";
import { NextResponse } from "next/server";
import { NOTIFICATION_RECIPIENT_EMAIL } from "@/app/util/constants";
import { QuestionEmailTemplate } from "@/app/landing-page/QuestionEmailTemplate";

const resend = new Resend(process.env.RESEND_API_KEY!);

export async function POST(req: Request) {
  const authHeader = req.headers.get("authorization");
    if (!authHeader) {
      return NextResponse.json(
        { message: "Authorization header missing" },
        { status: 401 }
      );
    }
  
    // Assuming the token is sent as "Bearer <token>"
    const token = authHeader.split(" ")[1];
  
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
  
    // Optionally, perform further checks on decoded.uuid or other claims
    if (!decoded.verified) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
  
  const body = await req.json();
  const { email, name, message, communicationConsent } = body;

  try {
    const { data, error } = await resend.emails.send({
      from: "Coach OS <info@coachpal.io>",
      to: NOTIFICATION_RECIPIENT_EMAIL,
      subject: "New Coach OS Question 👀",
      react: await QuestionEmailTemplate({
        email,
        name,
        message,
        communicationConsent,
      }),
    });

    if (error) {
      return NextResponse.json({ error }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
