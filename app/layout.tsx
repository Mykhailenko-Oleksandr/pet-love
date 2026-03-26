import "modern-normalize";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { ReactNode } from "react";
import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";
import Header from "@/components/Header/Header";
import AuthProvider from "@/components/AuthProvider/AuthProvider";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  title: "PetLove",
  description:
    "PetLove is a platform for pet lovers. Discover pets, share stories, and stay updated with the latest animal news.",
  openGraph: {
    title: "PetLove – Take good care of your small pets",
    description:
      "Find your perfect companion, connect with other pet lovers, and explore the latest updates on pets.",
    url: "https://pet-love-rust.vercel.app",
    images: [{ url: "/images/og.webp" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${manrope.variable}`}>
        <TanStackProvider>
          <AuthProvider>
            <Header />

            <main>{children}</main>

            <Toaster />
            <ReactQueryDevtools initialIsOpen={false} />
          </AuthProvider>
        </TanStackProvider>
      </body>
    </html>
  );
}
