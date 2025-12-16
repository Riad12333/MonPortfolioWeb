import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "@/components/providers";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "MonPortfolioWeb - Create your portfolio in minutes",
  description: "The simple and effective platform to showcase your projects.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} font-sans bg-slate-950 text-white antialiased`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
