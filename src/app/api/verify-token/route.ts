import { v4 as uuidv4 } from 'uuid';
import jwt from 'jsonwebtoken';
import { validateTurnstileToken } from 'next-turnstile';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { token } = await req.json();
  
  if (!token) {
    return NextResponse.json({ message: 'No token provided' }, { status: 400 });
  }
  
  const isValid = await validateTurnstileToken({
    token,
    secretKey: process.env.TURNSTILE_SECRET_KEY!,
    // Optional: Add an idempotency key to prevent token reuse
    idempotencyKey: uuidv4(),
    sandbox: process.env.NODE_ENV === "development",
  });
  
  if (!isValid.success) {
    return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
  }
  
  // Generate a unique ID and create a JWT payload
  const uuid = uuidv4();
  const payload = { verified: true, uuid };
  const jwtToken = jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: '1m' });
  
  return NextResponse.json({ jwt: jwtToken }, { status: 200 });
}
