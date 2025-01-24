import { type NextRequest, NextResponse } from "next/server"
import { readFile } from "fs/promises"
import path from "path"

export async function POST(request: NextRequest) {
  const emailConfig = await request.json()

  try {
    const layoutPath = path.join(process.cwd(), "layout.html")
    let template = await readFile(layoutPath, "utf-8")

    for (const [key, value] of Object.entries(emailConfig)) {
      template = template.replace(new RegExp(`{{${key}}}`, "g"), value as string)
    }

    return new NextResponse(template, {
      headers: {
        "Content-Type": "text/html",
        "Content-Disposition": 'attachment; filename="email_template.html"',
      },
    })
  } catch (error) {
    console.error("Error rendering template:", error)
    return NextResponse.json({ success: false }, { status: 500 })
  }
}

