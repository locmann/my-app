import axios from "axios";

const instance = axios.create({
  withCredentials: true,
  baseURL: `https://social-network.samuraijs.com/api/1.0/`,
  headers: {
    "API-KEY": "c44aa518-ff43-457d-b08f-4f3a76371829",
  },
});

export const usersAPI = {
  getUsers(currentPage = 1, pageSize = 4) {
    return instance
      .get(`users?page=${currentPage}&count=${pageSize}`)
      .then((response) => response.data);
  },
  followDelete(id) {
    return instance.delete(
      `follow/${id}`
    ) /* .then((response) => response.data) */;
  },
  followPost(id) {
    return instance.post(
      `follow/${id}`
    ) /* .then((response) => response.data) */;
  },
  getAuth() {
    return instance.get(`auth/me`);
  },
  setProfile(profileId) {
    console.warn("old version");
    return profileAPI.setProfile(profileId);
  },
};

export const profileAPI = {
  setProfile(profileId) {
    //debugger;
    return instance.get(`profile/${profileId}`);
    /* .then((response) => response.data) */
  },
  getStatus(userId) {
    return instance.get(`profile/status/${userId}`);
  },
  updateStatus(status) {
    return instance.put(`profile/status/`, { status: status });
  },
};
