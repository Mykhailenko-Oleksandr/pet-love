import { cookies } from "next/headers";
import { nextServer } from "./api";
import { NewsResponse, NoticesRequest, NoticesResponse } from "./clientApi";
import { Friends } from "@/types/friends";
import { Location } from "@/types/location";
import { Category } from "@/types/category";
import { User, UserFull } from "@/types/user";

export async function getNews(keyword: string, page: number, limit?: number) {
  const cookieStore = await cookies();
  const res = await nextServer.get<NewsResponse>("/news", {
    params: {
      keyword,
      page,
      limit,
    },
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return res.data;
}

export async function getFriends() {
  const cookieStore = await cookies();
  const res = await nextServer.get<Friends[]>("/friends", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return res.data;
}

export async function getCategories() {
  const cookieStore = await cookies();
  const res = await nextServer.get<Category[]>("/notices/categories", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return res.data;
}

export async function getGenders() {
  const cookieStore = await cookies();
  const res = await nextServer.get<string[]>("/notices/sex", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return res.data;
}

export async function getSpecies() {
  const cookieStore = await cookies();
  const res = await nextServer.get<string[]>("/notices/species", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return res.data;
}

export async function getLocations() {
  const cookieStore = await cookies();
  const res = await nextServer.get<Location[]>("/cities/locations", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return res.data;
}

export async function getNotices({
  page = 1,
  limit = 6,
  keyword,
  category,
  species,
  locationId,
  bySort,
  sex,
}: NoticesRequest) {
  const cookieStore = await cookies();

  let byPopularity: boolean | undefined;
  let byPrice: boolean | undefined;

  if (bySort === "popular") {
    byPopularity = false;
  }

  if (bySort === "unpopular") {
    byPopularity = true;
  }

  if (bySort === "cheap") {
    byPrice = true;
  }

  if (bySort === "expensive") {
    byPrice = false;
  }

  const res = await nextServer.get<NoticesResponse>("/notices", {
    params: {
      page,
      limit,
      keyword,
      category,
      species,
      locationId,
      sex,
      byPopularity: byPopularity ?? undefined,
      byPrice: byPrice ?? undefined,
    },
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return res.data;
}

export async function getCurrentFullUser() {
  const cookieStore = await cookies();

  const res = await nextServer.get<UserFull>("/users/current/full", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return res.data;
}

export async function currentUser() {
  const cookieStore = await cookies();
  const res = await nextServer.get<User>("/users/current", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return res.data;
}
