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
  getNotices,
  getSpecies,
} from "@/lib/api/serverApi";

const page = 1;
const searchWord = "";
const category = "";
const sex = "";
const type = "";
const locationId = "";
const bySort = "";

export default async function Notices() {
  const queryClient = new QueryClient();

  const categories = await getCategories();
  const genders = await getGenders();
  const species = await getSpecies();
  const locations = await getLocations();

  await queryClient.prefetchQuery({
    queryKey: [
      "notices",
      page,
      searchWord,
      category,
      sex,
      type,
      locationId,
      bySort,
    ],
    queryFn: () =>
      getNotices({
        page,
        keyword: searchWord,
        category,
        sex,
        species: type,
        locationId,
        bySort,
      }),
  });

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
