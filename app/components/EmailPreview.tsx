interface EmailPreviewProps {
    layout: string
    emailConfig: {
      title: string
      content: string
      imageUrl: string
      footer: string
      textColor: string
    }
  }
  
  export function EmailPreview({ layout, emailConfig }: EmailPreviewProps) {
    const renderPreview = () => {
      let preview = layout
      for (const [key, value] of Object.entries(emailConfig)) {
        preview = preview.replace(new RegExp(`{{${key}}}`, "g"), value)
      }
      return preview
    }
  
    return (
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-2xl font-bold mb-4">Email Preview</h2>
        <div className="border rounded p-4" dangerouslySetInnerHTML={{ __html: renderPreview() }}></div>
      </div>
    )
  }
  
  