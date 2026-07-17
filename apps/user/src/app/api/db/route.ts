import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

function safeJsonParse(str: string | null | undefined, fallback: any = null) {
  if (!str) return fallback;
  try { return JSON.parse(str); } catch { return fallback; }
}

export async function GET() {
  try {
    const [
      products,
      collections,
      bookings,
      orders,
      blog,
      users,
      officialSettings,
    ] = await Promise.all([
      prisma.product.findMany(),
      prisma.collection.findMany(),
      prisma.booking.findMany(),
      prisma.order.findMany({ orderBy: { date: "desc" } }),
      prisma.blog.findMany({ orderBy: { date: "desc" } }),
      prisma.user.findMany(),
      prisma.officialSettings.findUnique({ where: { id: "singleton" } }),
    ]);

    const parsedOrders = orders.map((o) => ({
      ...o,
      shippingDetails: safeJsonParse(o.shippingDetails, {}),
      items: safeJsonParse(o.items, []),
      courierDetails: safeJsonParse(o.courierDetails),
      shiprocketHistory: safeJsonParse(o.shiprocketHistory, []),
    }));

    const os = officialSettings || {};

    return NextResponse.json({
      products: products.map((p) => ({
        ...p,
        images: safeJsonParse(p.images, []),
      })),
      collections,
      bookings,
      orders: parsedOrders,
      blog,
      users,
      officialSettings: os,
      header: safeJsonParse((os as any).headerConfig, {}),
      hero: safeJsonParse((os as any).heroConfig, {}),
      announcements: safeJsonParse((os as any).announcements, []),
      features: safeJsonParse((os as any).features, []),
      featuredGems: safeJsonParse((os as any).featuredGems, []),
      homepageCollections: safeJsonParse((os as any).homepageCollections, []),
      evaluator: safeJsonParse((os as any).evaluatorConfig, {}),
      milestones: safeJsonParse((os as any).milestones, []),
      editorialQuote: safeJsonParse((os as any).editorialQuote, {}),
      about: safeJsonParse((os as any).aboutConfig, {}),
      contactSettings: safeJsonParse((os as any).contactConfig, {}),
      customBuilderConfig: safeJsonParse((os as any).customBuilderConfig, {}),
    });
  } catch (error: any) {
    console.error("GET /api/db error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
