import { Metadata } from "next";
import NotFoundSection from "@/components/NotFoundSection/NotFoundSection";

export const metadata: Metadata = {
  title: "404 - Not Found",
  description: "No such page exists",
  openGraph: {
    title: "404 - Not Found",
    description: "No such page exists",
    url: "https://",
    images: [{ url: "/images/og.webp" }],
  },
};

export default function NotFound() {
  return <NotFoundSection />;
}
