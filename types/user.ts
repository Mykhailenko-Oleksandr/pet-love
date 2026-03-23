import { Notice } from "./notice";
import { Pet } from "./pet";

export interface User {
  _id: string;
  name: string;
  email: string;
  avatar?: string;
  phone?: string;
  noticesFavorites: Notice[];
  noticesViewed?: Notice[];
  pets?: Pet[];
}

export interface UserFull extends User {
  noticesViewed: Notice[];
  pets: Pet[];
}
