import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const newBooking = {
      id: `BK-${Date.now().toString().slice(-3)}`,
      client: body.name,
      email: body.email,
      type: body.consultationType === "showroom" ? "Showroom" : "Virtual",
      date: body.date,
      slot: body.slot || "Morning",
      notes: body.notes || "",
    };

    await prisma.booking.create({ data: newBooking });

    return NextResponse.json({ success: true, booking: newBooking });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
