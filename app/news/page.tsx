import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import NewsClient from "./News.client";
import { getNews } from "@/lib/api/serverApi";

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
