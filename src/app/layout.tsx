import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter, JetBrains_Mono } from "next/font/google";
import { AuthProvider } from "@/features/auth/hooks/use-auth";
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
  title: "Naxivo | ERP Automation via WhatsApp",
  description: "Drivers update shipments through WhatsApp. AI automatically updates your ERP, timelines, and operations dashboard in real time.",
  keywords: ["logistics", "ERP automation", "whatsapp", "AI shipment tracking", "fleet management"],
  authors: [{ name: "NX Group" }],
  icons: {
    icon: [
      {
        url: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><rect width="32" height="32" rx="8" fill="%23059969"/><path d="M18 8l-4 8 4 4M14 12l-4 4 4 4" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/><circle cx="16" cy="16" r="2" fill="white"/></svg>',
        type: "image/svg+xml",
      },
    ],
  },
  openGraph: {
    title: "Naxivo | ERP Automation via WhatsApp",
    description: "Drivers update shipments through WhatsApp. AI automatically updates your ERP, timelines, and operations dashboard in real time.",
    type: "website",
    siteName: "Naxivo",
  },
  twitter: {
    card: "summary_large_image",
    title: "Naxivo | ERP Automation via WhatsApp",
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
      <body className="min-h-full flex flex-col"><AuthProvider>{children}</AuthProvider></body>
    </html>
  );
}
