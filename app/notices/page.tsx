import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import NoticesClient from "./Notices.client";
import {
  getCategories,
  getGenders,
  getLocations,
  getSpecies,
} from "@/lib/api/serverApi";

export default async function Notices() {
  const queryClient = new QueryClient();

  const categories = await getCategories();
  const genders = await getGenders();
  const species = await getSpecies();
  const locations = await getLocations();

  // const notices = await getNotices({ category: "sell" });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoticesClient
        categories={categories}
        genders={genders}
        species={species}
        locations={locations}
      />
    </HydrationBoundary>
  );
}
