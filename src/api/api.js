import axios from "axios";

const instance = axios.create({
  withCredentials: true,
  baseURL: `https://social-network.samuraijs.com/api/1.0/`,
  headers: {
    "API-KEY": "1c297358-95cd-4e8c-ab04-05e41ae78e42",
  },
});

export const usersAPI = {
  getUsers(currentPage = 1, pageSize = 4) {
    return instance
      .get(`users?page=${currentPage}&count=${pageSize}`)
      .then((response) => response.data);
  },
  followDelete(id) {
    return instance.delete(`follow/${id}`);
  },
  followPost(id) {
    return instance.post(`follow/${id}`);
  },
  getAuth() {
    return instance.get(`auth/me`);
  },
  setProfile(profileId) {
    console.warn("old version");
    return profileAPI.setProfile(profileId);
  },
  loginPost(email, password, rememberMe = false) {
    return instance.post(`auth/login`, { email, password, rememberMe });
  },
  logoutDelete() {
    return instance.delete(`auth/login`);
  },
};

export const profileAPI = {
  setProfile(profileId) {
    return instance.get(`profile/${profileId}`);
  },
  getStatus(userId) {
    return instance.get(`profile/status/${userId}`);
  },
  updateStatus(status) {
    return instance.put(`profile/status/`, { status: status });
  },
};
