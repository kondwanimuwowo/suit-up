import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Suit Up Zambia — Style. Service. Quality. Price.",
  description:
    "Turkish-crafted formal wear for the Zambian professional. Suits, shirts, and accessories. Two stores in Lusaka — Arcades Mall & Mosi oa Tunya Mall.",
  icons: {
    icon: "/logo.jpg",
    apple: "/logo.jpg",
  },
  openGraph: {
    title: "Suit Up Zambia — Style. Service. Quality. Price.",
    description:
      "Turkish-crafted formal wear for the Zambian professional. Two stores in Lusaka.",
    url: "https://suit-up-zm.vercel.app",
    siteName: "Suit Up Zambia",
    images: [{ url: "https://suit-up-zm.vercel.app/logo.jpg", width: 200, height: 90, alt: "Suit Up Zambia" }],
    locale: "en_ZM",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${manrope.variable} h-full`}>
      <body
        className="min-h-full antialiased"
        style={
          {
            "--su-display": `var(--font-cormorant), 'Times New Roman', serif`,
            "--su-body": `var(--font-manrope), system-ui, sans-serif`,
          } as React.CSSProperties
        }
      >
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
