import { User } from "@/types/user";
import { nextServer } from "./api";

interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export async function registerUser(body: RegisterRequest) {
  const res = await nextServer.post<User>("/users/signup", body);
  return res.data;
}
