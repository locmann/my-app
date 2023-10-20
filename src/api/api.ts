import { PhotosType, ProfileType } from "./../components/types/types";
import axios from "axios";
import {
  AuthLogin,
  AuthMe,
  Captcha,
  GetUsersType,
  Photos,
  ResponseType,
} from "./apiTypes";

const instance = axios.create({
  withCredentials: true,
  baseURL: `https://social-network.samuraijs.com/api/1.0/`,
  headers: {
    "API-KEY": "1c297358-95cd-4e8c-ab04-05e41ae78e42",
  },
});

export enum StatusCode {
  Success = 0,
  Error = 1,
  CaptchaIsRequired = 10,
}

export const usersAPI = {
  getUsers(currentPage = 1, pageSize = 4) {
    return instance
      .get<GetUsersType>(`users?page=${currentPage}&count=${pageSize}`)
      .then((response) => response.data);
  },
  followDelete(id: number) {
    return instance
      .delete<ResponseType>(`follow/${id}`)
      .then((response) => response.data);
  },
  followPost(id: number) {
    return instance
      .post<ResponseType>(`follow/${id}`)
      .then((response) => response.data);
  },
  getAuth() {
    return instance
      .get<ResponseType<AuthMe>>(`auth/me`)
      .then((response) => response.data);
  },
  loginPost(
    email: string,
    password: string,
    rememberMe = false,
    captcha: string | null = null
  ) {
    return instance
      .post<ResponseType<AuthLogin>>(`auth/login`, {
        email,
        password,
        rememberMe,
        captcha,
      })
      .then((response) => response.data);
  },
  logoutDelete() {
    return instance
      .delete<ResponseType>(`auth/login`)
      .then((response) => response.data);
  },
  getCaptcha() {
    return instance
      .get<Captcha>(`security/get-captcha-url`)
      .then((response) => response.data);
  },
};

export const profileAPI = {
  setProfile(profileId: number) {
    return instance
      .get<ProfileType>(`profile/${profileId}`)
      .then((response) => response.data);
  },
  getStatus(userId: number) {
    return instance
      .get<string>(`profile/status/${userId}`)
      .then((response) => response.data);
  },
  updateStatus(status: string) {
    return instance
      .put<ResponseType>(`profile/status/`, { status: status })
      .then((response) => response.data);
  },
  setPhoto(photoFile: any) {
    const formData = new FormData();
    formData.append("image", photoFile);
    return instance
      .put<ResponseType<Photos>>(`profile/photo`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => response.data);
  },
  updateProfile(profile: ProfileType) {
    return instance
      .put<ResponseType>("/profile", profile)
      .then((response) => response.data);
  },
};
