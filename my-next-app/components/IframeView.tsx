export default function IframeView() {
    return (
      <div className="h-full">
        <iframe
          src="https://example.com"
          className="w-full h-full border-0"
          title="Embedded Content"
          allowFullScreen
        />
      </div>
    )
  }
  
  