import { User, UserFull } from "@/types/user";
import { nextServer } from "./api";
import { News } from "@/types/news";
import { Friends } from "@/types/friends";
import { Notice, NoticeFull } from "@/types/notice";
import axios from "axios";

export interface NewsResponse {
  page: number;
  perPage: number;
  totalPages: number;
  results: News[];
}

export interface NoticesResponse {
  page: number;
  perPage: number;
  totalPages: number;
  results: Notice[];
}

export interface NoticesRequest {
  page?: number;
  limit?: number;
  keyword?: string;
  category?: string;
  species?: string;
  locationId?: string;
  bySort?: string;
  sex?: string;
}

interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

interface LoginRequest {
  email: string;
  password: string;
}

interface updateUserRequest {
  name?: string;
  email?: string;
  phone?: string;
  avatar?: string;
}

// Auth
export async function registerUser(body: RegisterRequest) {
  const res = await nextServer.post<User>("/users/signup", body);
  return res.data;
}

export async function loginUser(body: LoginRequest) {
  const res = await nextServer.post<User>("/users/signin", body);
  return res.data;
}

export async function logoutUser() {
  const res = await nextServer.post<User>("/users/signout");
  return res.data;
}

export async function currentUser() {
  const res = await nextServer.get<User>("/users/current");
  return res.data;
}

export async function getCurrentFullUser() {
  const res = await nextServer.get<UserFull>("/users/current/full");
  return res.data;
}

// News
export async function getNews(keyword: string, page: number, limit?: number) {
  const res = await nextServer.get<NewsResponse>("/news", {
    params: {
      keyword,
      page,
      limit,
    },
  });

  return res.data;
}

// Friends
export async function getFriends() {
  const res = await nextServer.get<Friends[]>("/friends");
  return res.data;
}

// Notices
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
  });
  return res.data;
}

export async function getNoticeById(id: string) {
  const res = await nextServer.get<NoticeFull>(`/notices/${id}`);
  return res.data;
}

export async function addFavoriteNotice(id: string) {
  const res = await nextServer.post<string[]>(`/notices/favorites/add/${id}`);
  return res.data;
}

export async function removeFavoriteNotice(id: string) {
  const res = await nextServer.delete<string[]>(
    `/notices/favorites/remove/${id}`,
  );
  return res.data;
}

// Users

export async function uploadImage(file: File): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "avatars");

  const res = await axios.post(
    `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
    formData,
    {
      headers: { "Content-Type": "multipart/form-data" },
    },
  );

  return res.data.secure_url;
}

export async function updateUser(body: updateUserRequest) {
  const res = await nextServer.patch<UserFull>("users/current/edit", body);

  return res.data;
}
