import { GetUsersItemsType, instance, ResponseType } from "./api.ts";


export const usersAPI = {
    getUsers(pageNumber = 1, pageSize = 5) {
        return instance.get<GetUsersItemsType>(`users?page=${pageNumber}&count=${pageSize}`)
            .then(res => res.data);
        },
    deleteFollowerApi(userId: number) {
        return instance.delete(`follow/${userId}`).then(res => res.data) as Promise<ResponseType>;
        },
    postFollowerApi(userId: number) {
        return instance.post<ResponseType>(`follow/${userId}`).then(res => res.data);
        }
}

