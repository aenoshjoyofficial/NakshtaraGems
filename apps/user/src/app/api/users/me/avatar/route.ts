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

export async function POST(request: Request) {
  try {
    const userId = await getSessionUser();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    if (file.size > 2 * 1024 * 1024) {
      return NextResponse.json({ error: "File too large. Max 2MB." }, { status: 400 });
    }

    const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ error: "Invalid file type. Use JPG, PNG, WebP, or GIF." }, { status: 400 });
    }

    let imageUrl: string;

    const cloudinaryUrl = process.env.CLOUDINARY_URL || "";
    if (cloudinaryUrl && !cloudinaryUrl.includes("placeholder")) {
      const buffer = Buffer.from(await file.arrayBuffer());
      const base64 = buffer.toString("base64");
      const dataUri = `data:${file.type};base64,${base64}`;

      const uploadRes = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudinaryUrl.split("@")[1] || ""}/image/upload`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            file: dataUri,
            upload_preset: process.env.CLOUDINARY_UPLOAD_PRESET || "ml_default",
            folder: "avatars",
          }),
        }
      );

      if (uploadRes.ok) {
        const uploadData = await uploadRes.json();
        imageUrl = uploadData.secure_url;
      } else {
        throw new Error("Cloudinary upload failed");
      }
    } else {
      const ext = file.name.split(".").pop() || "jpg";
      const filename = `avatar-${userId}-${Date.now()}.${ext}`;
      const uploadDir = "/Users/user/Desktop/Projects/nakshtara-gems/apps/user/public/uploads";

      const fs = await import("fs/promises");
      const pathModule = await import("path");
      await fs.mkdir(uploadDir, { recursive: true });
      const buffer = Buffer.from(await file.arrayBuffer());
      await fs.writeFile(pathModule.join(uploadDir, filename), buffer);
      imageUrl = `/uploads/${filename}`;
    }

    const user = await prisma.user.update({
      where: { id: userId },
      data: { image: imageUrl },
      select: { id: true, image: true },
    });

    return NextResponse.json({ success: true, image: user.image });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE() {
  try {
    const userId = await getSessionUser();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await prisma.user.update({
      where: { id: userId },
      data: { image: null },
    });

    return NextResponse.json({ success: true, image: null });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
