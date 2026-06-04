import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "LogisticsPro | ERP Automation via WhatsApp",
  description: "Drivers update shipments through WhatsApp. AI automatically updates your ERP, timelines, and operations dashboard in real time.",
  keywords: ["logistics", "ERP automation", "whatsapp", "AI shipment tracking", "fleet management"],
  authors: [{ name: "NX Group" }],
  openGraph: {
    title: "LogisticsPro | ERP Automation via WhatsApp",
    description: "Drivers update shipments through WhatsApp. AI automatically updates your ERP, timelines, and operations dashboard in real time.",
    type: "website",
    siteName: "LogisticsPro",
  },
  twitter: {
    card: "summary_large_image",
    title: "LogisticsPro | ERP Automation via WhatsApp",
    description: "Drivers update shipments through WhatsApp. AI automatically updates your ERP, timelines, and operations dashboard in real time.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${plusJakartaSans.variable} ${inter.variable} ${jetBrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
