import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import ProfileClient from "./Profile.client";
import { currentUser, getCurrentFullUser } from "@/lib/api/serverApi";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const user = await currentUser();

  return {
    title: `Profile - ${user.name}`,
    description:
      "Manage your personal profile on PetLove. Update your information, view your activity, and customize your experience.",
    openGraph: {
      title: `Profile - ${user.name}`,
      description:
        "Access your PetLove profile to edit details, track your notices, and manage your account settings.",
      url: "https://pet-love-rust.vercel.app/profile",
      images: [{ url: "/images/og.webp" }],
    },
  };
}

export default async function Profile() {
  const queryClient = new QueryClient();

  const user = await getCurrentFullUser();

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProfileClient userFull={user} />
    </HydrationBoundary>
  );
}
