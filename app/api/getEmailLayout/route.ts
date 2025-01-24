import { readFile } from "fs/promises"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const layout = await readFile("layout.html", "utf-8")
    return new NextResponse(layout, {
      headers: { "Content-Type": "text/html" },
    })
  } catch (error) {
    console.error("Error reading layout file:", error)
    return new NextResponse("Error reading layout file", { status: 500 })
  }
}

