import { Notice } from "./notice";

export interface User {
  _id: string;
  name: string;
  email: string;
  avatar?: string;
  phone?: string;
  noticesFavorites: Notice[];
}
