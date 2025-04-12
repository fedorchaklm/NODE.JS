import {urls} from "../constants/urls";
import {axiosInstance} from "./api.service";

export const userService = {
    getAvatar: () => {
        return axiosInstance.get<string>(urls.baseURL);
    }
}