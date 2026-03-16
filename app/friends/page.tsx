import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import FriendsClient from "./Friends.client";
import { getFriends } from "@/lib/api/serverApi";

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
