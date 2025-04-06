import axios from "axios";
import { authService } from "./auth.service";

export const axiosInstance = axios.create({
    "baseURL": "/api",
});

axiosInstance.interceptors.request.use((request) => {
    const accessToken = authService.getAccessToken();

    if (accessToken) {
        request.headers.Authorization = `Bearer ${accessToken}`;
    }

    return request;
});