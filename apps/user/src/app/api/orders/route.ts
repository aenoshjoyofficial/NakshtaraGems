import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (id) {
      const order = await prisma.order.findFirst({
        where: { id: { equals: id.toUpperCase() } },
      });
      if (!order) {
        return NextResponse.json({ error: "Order not found" }, { status: 404 });
      }
      return NextResponse.json({
        ...order,
        shippingDetails: JSON.parse(order.shippingDetails),
        items: JSON.parse(order.items),
        courierDetails: order.courierDetails ? JSON.parse(order.courierDetails) : null,
        shiprocketHistory: order.shiprocketHistory ? JSON.parse(order.shiprocketHistory) : null,
      });
    }

    const orders = await prisma.order.findMany({ orderBy: { date: "desc" } });
    return NextResponse.json(
      orders.map((o) => ({
        ...o,
        shippingDetails: JSON.parse(o.shippingDetails),
        items: JSON.parse(o.items),
        courierDetails: o.courierDetails ? JSON.parse(o.courierDetails) : null,
        shiprocketHistory: o.shiprocketHistory ? JSON.parse(o.shiprocketHistory) : null,
      }))
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const newOrder = await request.json();

    const created = await prisma.order.create({
      data: {
        id: newOrder.id,
        date: newOrder.date,
        status: newOrder.status || "Placed",
        shiprocketStatus: newOrder.shiprocketStatus || "Manifested",
        shippingDetails: JSON.stringify(newOrder.shippingDetails || {}),
        items: JSON.stringify(newOrder.items || []),
        courierDetails: newOrder.courierDetails ? JSON.stringify(newOrder.courierDetails) : null,
        shiprocketHistory: newOrder.shiprocketHistory ? JSON.stringify(newOrder.shiprocketHistory) : null,
      },
    });

    return NextResponse.json({ success: true, order: created });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
