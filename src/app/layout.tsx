import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FlightSchools4All — Find Flight Schools Across Europe",
  description:
    "Compare and find EASA-approved flight schools across Europe. Search by country, course type, and price to start your pilot training journey today.",
  keywords: [
    "flight schools",
    "pilot training",
    "EASA",
    "PPL",
    "ATPL",
    "aviation",
    "Europe",
    "Romania",
    "France",
    "Spain",
    "Great Britain",
    "Poland",
  ],
  authors: [{ name: "FlightSchools4All" }],
  icons: {
    icon: "/images/logo.jpeg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
