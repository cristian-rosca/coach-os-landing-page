import { BasicContactEmail } from "@/app/components/landing-page/BasicContactEmail";
import { Resend } from "resend";
import jwt, { JwtPayload } from "jsonwebtoken";
import { NextResponse } from "next/server";
import GoogleDriveAccessEmail from "@/app/components/email/GoogleDriveLinkEmail";
import { NOTIFICATION_RECIPIENT_EMAIL } from "@/app/util/constants";

const FREE_TIER_REGISTRATION_HEADER = "CoachPal Free Tier Registration 📊";
const FREE_TIER_REGISTRATION_SUBHEADER = "New"
const PREMIUM_TIER_REGISTRATION_HEADER = "CoachPal Premium Tier Registration 🚀";

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
  const { email, name, communicationConsent, isPremium } = body;

  try {
    const { error: ownEmailError } = await resend.emails.send({
      from: "CoachPal <info@coachpal.io>",
      to: NOTIFICATION_RECIPIENT_EMAIL,
      subject: isPremium
        ? PREMIUM_TIER_REGISTRATION_HEADER
        : FREE_TIER_REGISTRATION_HEADER,
      react: BasicContactEmail({
        heading: "Client Registration Details",
        email,
        name,
        communicationConsent,
        isPremium,
      }),
    });

    if (ownEmailError) {
      // Don't fail the entire request if sending to own email fails
      console.error(
        "Error sending email notification to own address:",
        ownEmailError
      );
    }
    
    const { data, error } = await resend.emails.send({
      from: "CoachPal <info@coachpal.io>",
      to: email,
      subject: "Your Coaching Tools & Systems 🚀",
      react: GoogleDriveAccessEmail({ name, variant: isPremium ? "premium" : "free" }),
    });
  
    if (error) {
      return NextResponse.json({ error }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.log("Error in POST /api/coaching-sheet-registration:", error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
