import { PhotosType, UserType } from "../components/types/types";
import { StatusCode } from "./api";

export type GetUsersType = {
  items: Array<UserType>;
  totalCount: number;
  error: string;
};

export type ResponseType<D = {}> = {
  data: D;
  resultCode: StatusCode;
  messages: Array<string>;
};

export type AuthMe = {
  id: number;
  email: string;
  login: string;
};
export type AuthLogin = {
  id: number;
};
export type Photos = {
  photos: PhotosType;
};

export type Captcha = {
  url: string;
};
