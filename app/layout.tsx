import type { Metadata } from "next";
import "./globals.css";





export const metadata: Metadata = {
  title: "Quisco Next.js con App Router y Prisma",
  description: "Quisco Next.js con App Router y Prisma",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased bg-gray-100`}
      >
        {children}
      </body>
    </html>
  );
}
