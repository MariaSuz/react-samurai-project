import { PhotosType, ProfileType } from "../types/types";
import { instance, ResponseType} from "./api.ts";

type PhotoResponseDataType = {
    photos: PhotosType
}

export const profileAPI = {
    getMe(userId: number) {
        return instance.get<ProfileType>(`profile/` + userId).then(res => res.data);
    },
    getStatus(userId: number) {
        return instance.get<string>(`profile/status/` + userId).then(res => res.data);
    },
    updateStatus(status: string) {
        return instance.put<ResponseType>(`profile/status/`, {status : status}).then(res => res.data);  //{status : status} - это означает отправку как json объект
    },
    savePhoto(photoFile: File) {
        const formData = new FormData();
        formData.append('image', photoFile);

        return instance.put<ResponseType<PhotoResponseDataType >>(`profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(res => res.data);
    },
    saveProfile(profile: ProfileType) {
        return instance.put<ResponseType>(`profile`, profile).then(res => res.data);
    }
}

