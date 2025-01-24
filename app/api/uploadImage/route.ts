import { writeFile } from "fs/promises"
import { type NextRequest, NextResponse } from "next/server"
import path from "path"

export async function POST(request: NextRequest) {
  const data = await request.formData()
  const file: File | null = data.get("image") as unknown as File

  if (!file) {
    return NextResponse.json({ success: false })
  }

  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)

  const filename = `${Date.now()}-${file.name}`
  const filepath = path.join(process.cwd(), "public", "uploads", filename)

  try {
    await writeFile(filepath, buffer)
    return NextResponse.json({ success: true, imageUrl: `/uploads/${filename}` })
  } catch (error) {
    console.error("Error saving image:", error)
    return NextResponse.json({ success: false }, { status: 500 })
  }
}

