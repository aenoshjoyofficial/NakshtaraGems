import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function GET() {
  try {
    const users = await prisma.user.findMany({
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
      },
    });
    return NextResponse.json(users);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const newUser = await request.json();

    // Avoid duplicates by email
    const exists = await prisma.user.findUnique({
      where: { email: newUser.email.toLowerCase() },
    });

    if (!exists) {
      const hashedPassword = await bcrypt.hash(newUser.password || "", 12);
      const encodedName = encodeURIComponent(newUser.name || "User");
      const avatarUrl = `https://ui-avatars.com/api/?name=${encodedName}&background=1a1a1a&color=d4a853&bold=true&size=200&font-size=0.45`;
      await prisma.user.create({
        data: {
          name: newUser.name,
          email: newUser.email.toLowerCase(),
          password: hashedPassword,
          role: "user",
          image: avatarUrl,
        },
      });
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
