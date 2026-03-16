import { WorkDay } from "./workDay";

export interface Friends {
  _id: string;
  title: string;
  url: string;
  addressUrl: string;
  imageUrl: string;
  address: string;
  phone: string;
  email: string;
  workDays: WorkDay[];
}
