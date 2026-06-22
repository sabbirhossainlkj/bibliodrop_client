import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const formData = await request.formData();
    const imageFile = formData.get("image");

    if (!imageFile) {
      return NextResponse.json({ error: "No image file found" }, { status: 400 });
    }

    const imgbbFormData = new FormData();
    imgbbFormData.append("image", imageFile);

    const imgbbResponse = await fetch(
      `https://api.imgbb.com/1/upload?key=${process.env.IMGBB_API_KEY}`,
      {
        method: "POST",
        body: imgbbFormData,
      }
    );

    const imgbbData = await imgbbResponse.json();

    if (!imgbbData.success) {
      return NextResponse.json({ error: "Failed to upload to imgBB" }, { status: 500 });
    }

    return NextResponse.json({ imageUrl: imgbbData.data.url });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}