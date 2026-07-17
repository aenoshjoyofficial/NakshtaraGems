import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { cookies } from "next/headers";
import prisma from "@/lib/prisma";

async function getSessionUser() {
  const cookieStore = await cookies();
  const token = await getToken({
    req: { headers: { cookie: cookieStore.toString() } } as any,
    secret: process.env.AUTH_SECRET,
  });
  if (!token?.id) return null;
  return token.id as string;
}

export async function GET() {
  try {
    const userId = await getSessionUser();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        phone: true,
        address: true,
        pincode: true,
        dob: true,
        ringSize: true,
        preferredMetal: true,
        role: true,
        createdAt: true,
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const userId = await getSessionUser();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const allowedFields = ["name", "phone", "address", "pincode", "dob", "ringSize", "preferredMetal"];
    const updateData: Record<string, string> = {};

    for (const field of allowedFields) {
      if (body[field] !== undefined) {
        updateData[field] = String(body[field]);
      }
    }

    const existing = await prisma.user.findUnique({ where: { id: userId }, select: { id: true } });
    if (!existing) {
      return NextResponse.json({ error: "Session expired. Please log in again." }, { status: 401 });
    }

    const user = await prisma.user.update({
      where: { id: userId },
      data: updateData,
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        phone: true,
        address: true,
        pincode: true,
        dob: true,
        ringSize: true,
        preferredMetal: true,
        role: true,
        createdAt: true,
      },
    });

    return NextResponse.json(user);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
