import { type NextRequest, NextResponse } from "next/server"
import { writeFile } from "fs/promises"
import path from "path"

export async function POST(request: NextRequest) {
  const emailConfig = await request.json()

  try {
    const configPath = path.join(process.cwd(), "data", "emailConfig.json")
    await writeFile(configPath, JSON.stringify(emailConfig, null, 2))
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error saving email configuration:", error)
    return NextResponse.json({ success: false }, { status: 500 })
  }
}

