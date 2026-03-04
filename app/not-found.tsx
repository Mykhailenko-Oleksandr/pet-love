import { Metadata } from "next";
import NotFoundSection from "@/components/NotFoundSection/NotFoundSection";

export const metadata: Metadata = {
  title: "Not Found",
  description: "No such page exists",
  openGraph: {
    title: "Not Found",
    description: "No such page exists",
    url: "https://",
    images: [{ url: "" }],
  },
};

export default function NotFound() {
  return <NotFoundSection />;
}
