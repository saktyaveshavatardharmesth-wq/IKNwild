import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // In a production app, you would upload this to S3, Cloudinary, or UploadThing.
    // For this prototype, we'll simulate an upload and return a placeholder URL.
    
    // Simulating delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // For now, we return a data URL or a placeholder
    // In local dev, you could write to /public/uploads, but that requires more setup.
    // We'll use a reliable placeholder for demo purposes.
    const mockImageUrl = `https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80`;

    return NextResponse.json({ url: mockImageUrl });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
