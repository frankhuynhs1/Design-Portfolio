import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Franklin Huynh | Product Designer",
  description:
    "5+ years design experience in e-commerce + consumer facing roles for iOS, Android, and Web across mobile, tablet, desktop devices.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="font-sans">
      <body className="antialiased">{children}</body>
    </html>
  );
}
