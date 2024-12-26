import { instance, ResultCodeEnum, ResultCodeForCaptchaEnum, ResponseType } from "./api.ts";

type MeResponseDataType = {
    id: number,
    email: string,
    login: string
}
type LoginResponseDataType = {
    userId: number
}

export const authAPI = {
    getAuth() {
        return instance.get<ResponseType<MeResponseDataType>>(`auth/me`).then(res => res.data);
    },
    getLogin(email: string, password: string, rememberMe = false, captcha: null | string = null) {
        return instance.post<ResponseType<LoginResponseDataType, ResultCodeEnum | ResultCodeForCaptchaEnum>>(`auth/login`, {email, password, rememberMe, captcha} ).then(res => res.data);
    },
    getLogOut() {
        return instance.delete(`auth/login`);
    }
}

