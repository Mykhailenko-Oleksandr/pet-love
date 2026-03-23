import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import ProfileClient from "./Profile.client";
import { getCurrentFullUser } from "@/lib/api/serverApi";

export default async function Profile() {
  const queryClient = new QueryClient();

  const user = await getCurrentFullUser();

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProfileClient userFull={user} />
    </HydrationBoundary>
  );
}
