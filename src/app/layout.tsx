import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "The Cohost Company – High Desert Vacation Rentals",
  description:
    "Modern desert retreats to vintage-inspired hideaways in Joshua Tree, Pioneertown & Yucca Valley. Thoughtfully managed, 5-star hosted.",
  icons: {
    icon: "https://thecohostcompany.com/wp-content/uploads/2025/05/Logos-.png",
    shortcut: "https://thecohostcompany.com/wp-content/uploads/2025/05/Logos-.png",
    apple: "https://thecohostcompany.com/wp-content/uploads/2025/05/Logos-.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${playfair.variable} ${inter.variable}`} suppressHydrationWarning>
        {children}
        {/* Elfsight widgets — single script load for entire site */}
        <Script src="https://elfsightcdn.com/platform.js" strategy="lazyOnload" />
      </body>
    </html>
  );
}
