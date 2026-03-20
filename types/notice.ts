import { Category } from "./category";
import { Species } from "./species";

export interface Notice {
  _id: string;
  species: Species;
  category: Category;
  price?: number;
  title: string;
  name: string;
  birthday: string;
  comment: string;
  sex: "unknown" | "female" | "male" | "multiple";
  location: string;
  imgURL: string;
  createdAt: string;
  user: string;
  popularity: number;
  updatedAt: string;
}

export interface NoticeFull {
  _id: string;
  species: Species;
  category: Category;
  price?: number;
  title: string;
  name: string;
  birthday: string;
  comment: string;
  sex: "unknown" | "female" | "male" | "multiple";
  location: {
    _id: string;
    stateEn: string;
    cityEn: string;
  };
  imgURL: string;
  createdAt: string;
  popularity: number;
  updatedAt: string;
  user: {
    _id: string;
    email: string;
    phone: string;
  };
}
