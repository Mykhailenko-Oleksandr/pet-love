import { User } from "@/types/user";
import { nextServer } from "./api";
import { News } from "@/types/news";

export interface NewsResponse {
  page: number;
  perPage: number;
  totalPages: number;
  results: News[];
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
  const res = await nextServer.get("/users/current");
  return res.data;
}
