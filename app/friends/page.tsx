import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import FriendsClient from "./Friends.client";
import { getFriends } from "@/lib/api/serverApi";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our friends",
  description:
    "Discover and connect with pet-friendly organizations, shelters, and communities on PetLove.",
  openGraph: {
    title: "Our friends – PetLove",
    description:
      "Explore trusted partners, shelters, and pet-friendly communities. Build connections and support animals together.",
    url: "https://pet-love-rust.vercel.app/friends",
    images: [{ url: "/images/og.webp" }],
  },
};

export default async function Friends() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["friends"],
    queryFn: () => getFriends(),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <FriendsClient />
    </HydrationBoundary>
  );
}
