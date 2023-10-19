import { ProfileType } from "./../components/types/types";
import axios from "axios";

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

type AuthMe = {
  data: { id: number; email: string; login: string };
  resultCode: StatusCode;
  messages: Array<string>;
};
type AuthLogin = {
  data: { id: number };
  resultCode: StatusCode;
  messages: Array<string>;
};

export const usersAPI = {
  getUsers(currentPage = 1, pageSize = 4) {
    return instance
      .get(`users?page=${currentPage}&count=${pageSize}`)
      .then((response) => response.data);
  },
  followDelete(id: number) {
    return instance.delete(`follow/${id}`);
  },
  followPost(id: number) {
    return instance.post(`follow/${id}`);
  },
  getAuth() {
    return instance.get<AuthMe>(`auth/me`).then((response) => response.data);
  },
  setProfile(profileId: number) {
    console.warn("old version");
    return profileAPI.setProfile(profileId);
  },
  loginPost(
    email: string,
    password: string,
    rememberMe = false,
    captcha: string | null = null
  ) {
    return instance
      .post<AuthLogin>(`auth/login`, {
        email,
        password,
        rememberMe,
        captcha,
      })
      .then((response) => response.data);
  },
  logoutDelete() {
    return instance.delete(`auth/login`);
  },
  getCaptcha() {
    return instance.get(`security/get-captcha-url`);
  },
};

export const profileAPI = {
  setProfile(profileId: number) {
    return instance.get(`profile/${profileId}`);
  },
  getStatus(userId: number) {
    return instance.get(`profile/status/${userId}`);
  },
  updateStatus(status: string) {
    return instance.put(`profile/status/`, { status: status });
  },
  setPhoto(photoFile: any) {
    const formData = new FormData();
    formData.append("image", photoFile);
    return instance.put(`profile/photo`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  updateProfile(profile: ProfileType) {
    return instance.put("/profile", profile);
  },
};
