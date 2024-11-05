import axios from "axios";

const instance = axios.create({
    withCredentials: true,
    baseURL: `https://social-network.samuraijs.com/api/1.0/`,
    headers: {
        "API-KEY": "5b479c9b-9199-48a5-ae7e-4ff0bdc2ca58"
    }
});

export const usersAPI = {
    getUsers(pageNumber = 1, pageSize = 5) {
        return instance.get(`users?page=${pageNumber}&count=${pageSize}`)
            .then(response => {
               return  response.data;
            });
        },
    deleteFollowerApi(userId) {
        return instance.delete(`follow/${userId}`)
        },
    postFollowerApi(userId) {
        return instance.post(`follow/${userId}`)
        }
}


export const authAPI = {
    getAuth() {
        return instance.get(`auth/me`)
}
}

export const profileAPI = {
    getMe(userId) {
        return instance.get(`profile/` + userId)
    },
    getStatus(userId) {
        return instance.get(`profile/status/` + userId)
    },
    updateStatus(status) {
        return instance.put(`profile/status/`, {status : status})
    },
}