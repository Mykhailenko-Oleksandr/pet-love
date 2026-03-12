import axios, { AxiosError } from "axios";

export type ApiError = AxiosError<{
  error: string;
  response: {
    data: {
      response: {
        message: string;
      };
    };
    message: string;
    validation: { body: { message: string } };
  };
}>;

export const api = axios.create({
  baseURL: "https://petlove.b.goit.study/api",
  withCredentials: true,
});
