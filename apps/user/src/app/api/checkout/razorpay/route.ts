import { NextResponse } from "next/server";
import Razorpay from "razorpay";

export async function POST(request: Request) {
  try {
    const { amount } = await request.json();
    if (!amount || isNaN(amount)) {
      return NextResponse.json({ error: "Invalid amount" }, { status: 400 });
    }

    const keyId = process.env.RAZORPAY_KEY_ID || "rzp_test_NakshtaraDummyKey";
    const keySecret = process.env.RAZORPAY_KEY_SECRET || "NakshtaraDummySecretValue";

    // Initialize Razorpay client
    const instance = new Razorpay({
      key_id: keyId,
      key_secret: keySecret,
    });

    const order = await instance.orders.create({
      amount: Math.round(amount * 100), // Amount in paise
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    });

    return NextResponse.json({
      id: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId,
    });
  } catch (error: any) {
    console.error("Razorpay order generation error:", error);
    return NextResponse.json({ error: error.message || "Failed to create payment order" }, { status: 500 });
  }
}
