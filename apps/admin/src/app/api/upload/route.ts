import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { getToken } from "next-auth/jwt";

export async function POST(request: Request) {
  try {
    const token = await getToken({ req: request as any, secret: process.env.AUTH_SECRET });
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // Try Cloudinary upload if configured (and not dummy placeholder)
    const cloudinaryUrl = process.env.CLOUDINARY_URL || "";
    if (cloudinaryUrl && !cloudinaryUrl.includes("dummy_cloud")) {
      try {
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const base64File = `data:${file.type};base64,${buffer.toString("base64")}`;

        // Extract cloud name, api key, and secret from CLOUDINARY_URL
        // URL format: cloudinary://api_key:api_secret@cloud_name
        const match = cloudinaryUrl.match(/cloudinary:\/\/([^:]+):([^@]+)@(.+)/);
        if (match) {
          const [, apiKey, apiSecret, cloudName] = match;
          const timestamp = Math.round(new Date().getTime() / 1000).toString();
          
          // Generate signature
          const crypto = await import("crypto");
          const signature = crypto
            .createHash("sha1")
            .update(`timestamp=${timestamp}${apiSecret}`)
            .digest("hex");

          const uploadFormData = new FormData();
          uploadFormData.append("file", base64File);
          uploadFormData.append("api_key", apiKey);
          uploadFormData.append("timestamp", timestamp);
          uploadFormData.append("signature", signature);

          const cloudinaryRes = await fetch(
            `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
            {
              method: "POST",
              body: uploadFormData,
            }
          );

          if (cloudinaryRes.ok) {
            const data = await cloudinaryRes.json();
            return NextResponse.json({ success: true, url: data.secure_url });
          }
        }
      } catch (cloudinaryError) {
        console.warn("Cloudinary upload failed, falling back to local storage:", cloudinaryError);
      }
    }

    // Fallback: Save locally to apps/user/public/uploads/
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const uploadsDir = path.join(process.cwd(), "../user/public/uploads");
    await fs.mkdir(uploadsDir, { recursive: true });

    const fileExtension = path.extname(file.name) || ".png";
    const filename = `${Date.now()}_${Math.floor(Math.random() * 1000)}${fileExtension}`;
    const filepath = path.join(uploadsDir, filename);

    await fs.writeFile(filepath, buffer);

    return NextResponse.json({ success: true, url: `/uploads/${filename}` });
  } catch (error: any) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: error.message || "Failed to upload image" }, { status: 500 });
  }
}
