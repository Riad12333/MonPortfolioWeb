
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    // In a real app, this would generate a token, save it to DB, and email it via SendGrid/Resend.
    // For this demo/MVP, we just simulate success.

    const { email } = await req.json();

    if (!email) {
        return NextResponse.json({ error: "Email required" }, { status: 400 });
    }

    // Simulate delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    console.log(`[Mock] Password reset requested for ${email}`);

    return NextResponse.json({ message: "Reset link sent" });
}
