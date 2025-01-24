"use client"

import { useState, useEffect } from "react"
import { EmailEditor } from "./components/EmailEditor"
import { EmailPreview } from "./components/EmailPreview"

export default function Home() {
  const [layout, setLayout] = useState("")
  const [emailConfig, setEmailConfig] = useState({
    title: "",
    content: "",
    imageUrl: "",
    footer: "",
    textColor: "#000000",
  })

  useEffect(() => {
    fetchEmailLayout()
  }, [])

  const fetchEmailLayout = async () => {
    try {
      const response = await fetch("/api/getEmailLayout")
      const data = await response.text()
      setLayout(data)
    } catch (error) {
      console.error("Error fetching email layout:", error)
    }
  }

  const handleConfigChange = (key: string, value: string) => {
    setEmailConfig((prev) => ({ ...prev, [key]: value }))
  }

  const handleImageUpload = async (file: File) => {
    const formData = new FormData()
    formData.append("image", file)

    try {
      const response = await fetch("/api/uploadImage", {
        method: "POST",
        body: formData,
      })
      const data = await response.json()
      handleConfigChange("imageUrl", data.imageUrl)
    } catch (error) {
      console.error("Error uploading image:", error)
    }
  }

  const handleSaveConfig = async () => {
    try {
      await fetch("/api/uploadEmailConfig", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(emailConfig),
      })
      alert("Email configuration saved successfully!")
    } catch (error) {
      console.error("Error saving email configuration:", error)
    }
  }

  const handleDownloadTemplate = async () => {
    try {
      const response = await fetch("/api/renderAndDownloadTemplate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(emailConfig),
      })
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = "email_template.html"
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error("Error downloading template:", error)
    }
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Email Builder</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <EmailEditor
          emailConfig={emailConfig}
          onConfigChange={handleConfigChange}
          onImageUpload={handleImageUpload}
          onSaveConfig={handleSaveConfig}
          onDownloadTemplate={handleDownloadTemplate}
        />
        <EmailPreview layout={layout} emailConfig={emailConfig} />
      </div>
    </main>
  )
}

