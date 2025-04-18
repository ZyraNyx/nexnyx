import type { Metadata } from "next";
import "./globals.css";

import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "sonner";
import ClientWrapper from "./ClientWrapper";

// ✅ Fonts
const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

// ✅ Metadata
export const metadata: Metadata = {
  title: "NexNyx",
  description: "Next Level. Next Nyx.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ClientWrapper>
          {children}
          <Toaster richColors position="top-center" />
        </ClientWrapper>
      </body>
    </html>
  );
}
