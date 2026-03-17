import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import NoticesClient from "./Notices.client";
import { getCategories, getGenders, getSpecies } from "@/lib/api/serverApi";

export default async function Notices() {
  const queryClient = new QueryClient();

  const categories = await getCategories();
  const genders = await getGenders();
  const species = await getSpecies();

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoticesClient />
    </HydrationBoundary>
  );
}
