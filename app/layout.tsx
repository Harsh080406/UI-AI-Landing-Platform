import type { Metadata } from "next";
import { JetBrains_Mono, Inter } from "next/font/google";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display",
  weight: ["400", "600", "700", "800"],
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://axon-automation.ai"),
  title: "AXON — Power your future with AI",
  description: "Deploy custom enterprise agents and automate complex workflows. Scale your intelligence with AXON today.",
  keywords: [
    "AI agents",
    "workflow automation",
    "AI platform",
    "enterprise automation",
    "axon ai",
  ],
  openGraph: {
    title: "AXON — Power your future with AI",
    description: "Deploy custom enterprise agents and automate complex workflows. Scale your intelligence with AXON today.",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "AXON — Power your future with AI",
    description: "Deploy custom enterprise agents and automate complex workflows.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${jetbrainsMono.variable} ${inter.variable}`}>
      <body className="font-body antialiased bg-[#0D0D0D] text-arctic selection:bg-forsythia/30">
        {children}
      </body>
    </html>
  );
}
