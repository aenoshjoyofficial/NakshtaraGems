import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const DB_PATH = path.join(process.cwd(), "src/mocks/db.json");

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const fileContent = await fs.readFile(DB_PATH, "utf-8");
    const db = JSON.parse(fileContent);

    const newBooking = {
      id: `BK-${Date.now().toString().slice(-3)}`,
      client: body.name,
      email: body.email,
      type: body.consultationType === "showroom" ? "Showroom" : "Virtual",
      date: body.date,
      slot: body.slot || "Morning",
      notes: body.notes || "",
    };

    db.bookings = [...(db.bookings || []), newBooking];
    await fs.writeFile(DB_PATH, JSON.stringify(db, null, 2), "utf-8");

    return NextResponse.json({ success: true, booking: newBooking });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
