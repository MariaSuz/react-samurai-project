import axios from "axios";
import { UsersType } from "../types/types";

export const instance = axios.create({
    withCredentials: true,
    baseURL: `https://social-network.samuraijs.com/api/1.0/`,
    headers: {
        "API-KEY": "5b479c9b-9199-48a5-ae7e-4ff0bdc2ca58"
    }
});

export enum ResultCodeEnum {
    Success = 0,
    Error = 1,
}

export enum ResultCodeForCaptchaEnum {
    CaptchIsRequired = 10,
}

export type GetUsersItemsType = {
    items: Array<UsersType>,
    totalCount: number,
    error: string | null,
}

//Дженерик
export type ResponseType<D = {}, R = ResultCodeEnum> = {
    data: D,
    messages: Array<string>,
    resultCode: R
}
//Сократили этот код из-за дженерика
// type MeResponseType = {
//     data: {id: number, email: string, login: string},
//     resultCode: ResultCodeEnum,
//     messages: Array<string>
// }
// type LoginResponseType = {
//     data: {userId: number},
//     resultCode: ResultCodeEnum | ResultCodeForCaptchaEnum,
//     messages: Array<string>
// }