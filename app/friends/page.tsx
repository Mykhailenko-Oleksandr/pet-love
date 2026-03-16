import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import FriendsClient from "./Friends.client";

export default async function Friends() {
  const queryClient = new QueryClient();

  // await queryClient.prefetchQuery({
  //   // queryKey: ["news", searchWord, page],
  //   // queryFn: () => getNews(searchWord, page),
  // });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <FriendsClient />
    </HydrationBoundary>
  );
}
