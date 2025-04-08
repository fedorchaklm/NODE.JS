import axios, {AxiosError} from "axios";
import {authService} from "./auth.service";
import {urls} from "../constants/urls";
import router from "../router/router";

export const axiosInstance = axios.create({
    "baseURL": process.env.REACT_APP_BASE_URL,
});

let isRefreshing = false;
type IWaitList = () => void;
const waitList: IWaitList[] = [];

axiosInstance.interceptors.request.use((request) => {
    const accessToken = authService.getAccessToken();
    console.log({accessToken});
    if (accessToken) {
        request.headers.Authorization = `Bearer ` + accessToken;
    }

    return request;
});

axiosInstance.interceptors.response.use(res => {
        return res;
    },
    async (error: AxiosError) => {
        const originalRequest = error.config;

        if (error.response?.status === 401) {

            if (!isRefreshing) {
                isRefreshing = true

                try {
                    await authService.refresh();
                    runAfterRefresh();
                    isRefreshing = false
                    return axiosInstance(originalRequest!);
                } catch (e) {
                    authService.deleteTokens();
                    isRefreshing = false;
                    await router.navigate('/login?sessionExpired=true');
                    return Promise.reject(error);
                }
            }

            if (originalRequest?.url === urls.auth.refresh) {
                return Promise.reject(error);
            }

            return new Promise(resolve => {
                subscribeToWaitList(()=>{
                    resolve(axiosInstance(originalRequest!));
                })
            })


        }
        return Promise.reject(error);
    }
)

const subscribeToWaitList = (cb: IWaitList): void => {
    waitList.push(cb);
}

const runAfterRefresh = ():void=>{
    while (waitList.length){
        const cb = waitList.pop();
        if (cb) cb();
    }
}