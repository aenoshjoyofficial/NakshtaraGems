import { NextResponse } from "next/server";
import crypto from "crypto";
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      orderDetails,
    } = await request.json();

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !orderDetails) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const keySecret = process.env.RAZORPAY_KEY_SECRET || "NakshtaraDummySecretValue";

    // Validate signature
    const generated_signature = crypto
      .createHmac("sha256", keySecret)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (generated_signature !== razorpay_signature) {
      return NextResponse.json({ success: false, error: "Payment verification failed" }, { status: 400 });
    }

    // Write payment-verified order directly to database
    const createdOrder = await prisma.order.create({
      data: {
        id: orderDetails.id,
        date: orderDetails.date,
        status: "Paid",
        shiprocketStatus: "Manifested",
        shippingDetails: JSON.stringify(orderDetails.shippingDetails),
        items: JSON.stringify(orderDetails.items),
        courierDetails: null,
        shiprocketHistory: JSON.stringify([
          {
            time: new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", hour12: false }),
            status: "Order Placed",
            location: "Nakshatra Atelier, Mumbai",
            description: `Payment authenticated via Razorpay (Ref: ${razorpay_payment_id}). Preparing items for dispatch.`,
          }
        ]),
      },
    });

    return NextResponse.json({ success: true, order: createdOrder });
  } catch (error: any) {
    console.error("Razorpay signature verification error:", error);
    return NextResponse.json({ success: false, error: error.message || "Verification failed" }, { status: 500 });
  }
}
