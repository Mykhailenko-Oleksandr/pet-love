import { Category } from "./category";
import { Species } from "./species";

export interface Notice {
  _id: string;
  species: Species;
  category: Category;
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
