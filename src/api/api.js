import axios from "axios"

export const usersAPI = {
    instance: axios.create({
        withCredentials: true,
        baseURL: `https://social-network.samuraijs.com/api/1.0/`,
        headers: {
            "API-KEY": "c44aa518-ff43-457d-b08f-4f3a76371829"
        }
    }),

    getUsers(currentPage = 1, pageSize = 4) {
        return this.instance.get(
            `users?page=${currentPage}&count=${pageSize}`
        ).then(
            response => response.data
        )
    },
    followDelete(id) {
        return this.instance.delete(
            `follow/${id}`
        ).then(
            response => response.data
        )
    },
    followPost(id) {
        return this.instance.post(
            `follow/${id}`
        ).then(
            response => response.data
        )
    },
    getAuth() {
        return this.instance.get(`auth/me`).then(
                response => response.data
            )
    }
}
