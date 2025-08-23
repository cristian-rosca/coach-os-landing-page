import { Resend } from "resend";
import jwt, { JwtPayload } from "jsonwebtoken";
import { NextResponse } from "next/server";
import { NOTIFICATION_RECIPIENT_EMAIL } from "@/app/util/constants";
import { BasicContactEmail } from "@/app/email/BasicContactEmail";

const HEADER = "Coach OS Registration 📊";

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
  const { email, name, clientVolume } = body;

  try {
    const { data, error: ownEmailError } = await resend.emails.send({
      from: "Coach OS <info@coachpal.io>",
      to: NOTIFICATION_RECIPIENT_EMAIL,
      subject: HEADER,
      react: await BasicContactEmail({
        heading: "Client Registration Details",
        email,
        name,
        clientVolume
      }),
    });

    if (ownEmailError) {
      // Don't fail the entire request if sending to own email fails
      console.error(
        "Error sending email notification to own address:",
        ownEmailError
      );
    }
  
    return NextResponse.json(data);
  } catch (error) {
    console.log("Error in POST /api/coaching-sheet-registration:", error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
