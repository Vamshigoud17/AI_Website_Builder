// app/layout.tsx
import './globals.css'; // Import global styles (optional)

export default function RootLayout({
  children, // This will be populated with your pages' content
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en"> {/* Add lang attribute for accessibility */}
      <body>
        {/* Here you can add global wrappers, header, footer, etc. */}
        {children} {/* This renders the content of each page */}
      </body>
    </html>
  );
}
