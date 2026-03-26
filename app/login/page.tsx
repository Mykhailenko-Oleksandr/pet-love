import LoginPageSection from "@/components/LoginPageSection/LoginPageSection";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
  description:
    "Access your PetLove account to manage your pets, connect with friends, and explore the community.",
  openGraph: {
    title: "Login – PetLove",
    description:
      "Sign in to PetLove to add pets, view notices, and connect with other pet lovers.",
    url: "https://pet-love-rust.vercel.app/login",
    images: [{ url: "/images/og.webp" }],
  },
};

export default function Login() {
  return <LoginPageSection />;
}
