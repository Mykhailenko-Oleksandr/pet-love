import { cookies } from "next/headers";
import { nextServer } from "./api";
import { NewsResponse } from "./clientApi";
import { Friends } from "@/types/friends";

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
