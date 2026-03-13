import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import NewsClient from "./News.client";
import { getNews } from "@/lib/api/serverApi";

export default async function News() {
  const queryClient = new QueryClient();
  const news = await getNews(" pavilion ", 1);
  console.log("news", news);
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NewsClient />
    </HydrationBoundary>
  );
}
