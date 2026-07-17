import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getToken } from "next-auth/jwt";

function safeJsonParse(str: string | null | undefined, fallback: any = null) {
  if (!str) return fallback;
  try { return JSON.parse(str); } catch { return fallback; }
}

export async function GET(request: Request) {
  try {
    const token = await getToken({ req: request as any, secret: process.env.AUTH_SECRET });
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
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
      prisma.user.findMany({ orderBy: { createdAt: "desc" }, select: { id: true, email: true, name: true, role: true, createdAt: true, phone: true, address: true, pincode: true, dob: true, ringSize: true, preferredMetal: true } }),
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

export async function POST(request: Request) {
  try {
    const token = await getToken({ req: request as any, secret: process.env.AUTH_SECRET });
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();

    // --- Products ---
    if (body.products) {
      // Delete all and re-insert (full sync)
      await prisma.product.deleteMany();
      if (body.products.length > 0) {
        await prisma.product.createMany({
          data: body.products.map((p: any) => ({
            id: p.id,
            name: p.name,
            category: p.category,
            price: Number(p.price || 0),
            description: p.description || "",
            cut: p.cut || "",
            carat: Number(p.carat || 0),
            clarity: p.clarity || "",
            certification: p.certification || p.certificate || "",
            image: p.image || "",
            rating: Number(p.rating || 0),
            reviews: Number(p.reviews || 0),
            inStock: p.inStock ?? true,
            color: p.color || "",
            metal: p.metal || "",
            collection: p.collection || "",
            certificate: p.certificate || "",
            shape: p.shape || "",
            gemType: p.gemType || "",
            origin: p.origin || "",
            treatment: p.treatment || "",
            stockCount: Number(p.stockCount ?? 0),
            draft: !!p.draft,
            images: JSON.stringify(p.images || []),
            video: p.video || "",
          })),
        });
      }
    }

    // --- Collections ---
    if (body.collections) {
      await prisma.collection.deleteMany();
      if (body.collections.length > 0) {
        await prisma.collection.createMany({
          data: body.collections.map((c: any) => {
            const id = c.id || c.name.toLowerCase().replace(/\s+/g, "-");
            return {
              id,
              name: c.name,
              badge: c.badge || "",
              description: c.desc || c.description || "",
              image: c.image || c.bgClass || "",
            };
          }),
        });
      }
    }

    // --- Bookings ---
    if (body.bookings) {
      await prisma.booking.deleteMany();
      if (body.bookings.length > 0) {
        await prisma.booking.createMany({
          data: body.bookings.map((b: any) => ({
            id: b.id,
            client: b.client,
            email: b.email,
            type: b.type,
            date: b.date,
            slot: b.slot,
            notes: b.notes || "",
          })),
        });
      }
    }

    // --- Orders ---
    if (body.orders) {
      for (const o of body.orders) {
        await prisma.order.upsert({
          where: { id: o.id },
          update: {
            status: o.status || "Placed",
            shiprocketStatus: o.shiprocketStatus || "Manifested",
            shippingDetails: JSON.stringify(o.shippingDetails || {}),
            items: JSON.stringify(o.items || []),
            courierDetails: o.courierDetails ? JSON.stringify(o.courierDetails) : null,
            shiprocketHistory: o.shiprocketHistory ? JSON.stringify(o.shiprocketHistory) : null,
          },
          create: {
            id: o.id,
            date: o.date,
            status: o.status || "Placed",
            shiprocketStatus: o.shiprocketStatus || "Manifested",
            shippingDetails: JSON.stringify(o.shippingDetails || {}),
            items: JSON.stringify(o.items || []),
            courierDetails: o.courierDetails ? JSON.stringify(o.courierDetails) : null,
            shiprocketHistory: o.shiprocketHistory ? JSON.stringify(o.shiprocketHistory) : null,
          },
        });
      }
    }

    // --- Blog ---
    if (body.blog) {
      await prisma.blog.deleteMany();
      if (body.blog.length > 0) {
        await prisma.blog.createMany({
          data: body.blog.map((post: any) => ({
            id: post.id,
            title: post.title,
            excerpt: post.excerpt || "",
            category: post.category || "",
            date: post.date || "",
          })),
        });
      }
    }

    // --- Users ---
    if (body.users) {
      await prisma.user.deleteMany();
      if (body.users.length > 0) {
        await prisma.user.createMany({
          data: body.users.map((u: any) => ({
            id: u.id || crypto.randomUUID(),
            email: u.email,
            name: u.name || "",
            password: u.password || "",
          })),
        });
      }
    }

    // --- Official Settings (including all site config) ---
    const officialData: any = {};
    if (body.officialSettings) {
      const s = body.officialSettings;
      Object.assign(officialData, {
        gstRate: Number(s.gstRate ?? 3.0),
        facebook: s.facebook || "",
        instagram: s.instagram || "",
        pinterest: s.pinterest || "",
        shippingContent: s.shippingContent || "",
        returnsContent: s.returnsContent || "",
        faqContent: s.faqContent || "",
        privacyContent: s.privacyContent || "",
        termsContent: s.termsContent || "",
      });
    }

    // Save site-wide UI config from top-level body fields
    officialData.headerConfig = JSON.stringify(body.header ?? {});
    officialData.heroConfig = JSON.stringify(body.hero ?? {});
    officialData.announcements = JSON.stringify(body.announcements ?? []);
    officialData.features = JSON.stringify(body.features ?? []);
    officialData.featuredGems = JSON.stringify(body.featuredGems ?? []);
    officialData.homepageCollections = JSON.stringify(body.homepageCollections ?? []);
    officialData.evaluatorConfig = JSON.stringify(body.evaluator ?? {});
    officialData.milestones = JSON.stringify(body.milestones ?? []);
    officialData.editorialQuote = JSON.stringify(body.editorialQuote ?? {});
    officialData.aboutConfig = JSON.stringify(body.about ?? {});
    officialData.contactConfig = JSON.stringify(body.contactSettings ?? {});
    officialData.customBuilderConfig = JSON.stringify(body.customBuilderConfig ?? {});

    await prisma.officialSettings.upsert({
      where: { id: "singleton" },
      update: officialData,
      create: { id: "singleton", ...officialData },
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("POST /api/db error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
