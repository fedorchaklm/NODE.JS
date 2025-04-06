import {IAuth} from "../interfaces/IAuth";
import {axiosInstance} from "./api.service";
import {urls} from "../constants/urls";
import {ITokens} from "../interfaces/ITokens";
import {IUserWithTokens} from "../interfaces/IUserWithToken";
import {ResType} from "../interfaces/ResType";
import {IUser} from "../interfaces/IUser";

const _accessToken = "accessToken";
const _refreshToken = "refreshToken";

export const authService = {
    register: (user: IAuth): ResType<IUserWithTokens> => {
        return axiosInstance.post<IUserWithTokens>(urls.auth.register, user);
    },

    me(): ResType<IUser> {
        return axiosInstance.get<IUser>(urls.auth.me);
    },

    async login (user: IAuth)  {
        const {data} = await axiosInstance.post<IUserWithTokens>(urls.auth.login, user);
        setTokens(data);
        const {data: my} = await this.me();
        return my;
    },

    setTokens: ({accessToken, refreshToken}: ITokens): void => {
        localStorage.setItem(_accessToken, JSON.stringify(accessToken));
        localStorage.setItem(_refreshToken, JSON.stringify(refreshToken));
    },

    getAccessToken: (): string => {
        return localStorage.getItem(_accessToken) || "";
    },

    getRefreshToken: (): string => {
        return localStorage.getItem(_refreshToken) || "";
    },
};

function setTokens({accessToken, refreshToken}: ITokens): void {
    localStorage.setItem(_accessToken, JSON.stringify(accessToken));
    localStorage.setItem(_refreshToken, JSON.stringify(refreshToken));
}