import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import NewsClient from "./News.client";
import { getNews } from "@/lib/api/serverApi";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "News",
  description:
    "Stay updated with the latest pet news, tips, and stories from the PetLove community.",
  openGraph: {
    title: "News – PetLove",
    description:
      "Explore articles, updates, and stories about pets and animal care. Stay informed with PetLove News.",
    url: "https://pet-love-rust.vercel.app/news",
    images: [{ url: "/images/og.webp" }],
  },
};

const searchWord = "";
const page = 1;

export default async function News() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["news", searchWord, page],
    queryFn: () => getNews(searchWord, page),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NewsClient />
    </HydrationBoundary>
  );
}
