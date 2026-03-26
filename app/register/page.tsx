import RegisterPageSection from "@/components/RegisterPageSection/RegisterPageSection";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Register",
  description:
    "Create your PetLove account to add pets, connect with friends, and join the pet-loving community.",
  openGraph: {
    title: "Register – PetLove",
    description:
      "Sign up for PetLove and start sharing your pets, stories, and experiences with other pet lovers.",
    url: "https://pet-love-rust.vercel.app/register",
    images: [{ url: "/images/og.webp" }],
  },
};

export default function Register() {
  return <RegisterPageSection />;
}
