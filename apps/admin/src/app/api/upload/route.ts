import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const folder = (formData.get("folder") as string) || "";

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Generate a unique filename using timestamp
    const ext = path.extname(file.name) || ".jpg";
    const timestamp = Date.now();
    const safeName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_").replace(ext, "");
    const filename = `${safeName}-${timestamp}${ext}`;

    // Target upload folder in the storefront project: apps/user/public/uploads/<folder>
    const uploadDir = path.join(process.cwd(), "../user/public/uploads", folder);
    
    // Ensure directory exists
    await fs.mkdir(uploadDir, { recursive: true });

    const filePath = path.join(uploadDir, filename);
    await fs.writeFile(filePath, buffer);

    // Return the relative URL path for the storefront to load
    const url = `/uploads/${folder ? folder + "/" : ""}${filename}`;

    return NextResponse.json({ success: true, url, filename });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
