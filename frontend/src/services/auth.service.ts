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

    async login(user: IAuth): Promise<IUser> {
        try {
            console.log('> login', {user});
            const {data} = await axiosInstance.post<ITokens>(urls.auth.login, user);
            console.log('> login', {data});
            this.setTokens(data);
            const {data: me} = await this.me();
            console.log('> login', {me});
            return me;
        } catch (e) {
            console.log('> login', e);
            throw e;
        }
    },

    async refresh(): Promise<void> {
        const refreshToken = this.getRefreshToken();

        if (refreshToken) {
            const {data} = await axiosInstance.post<ITokens>(urls.auth.refresh,  {refreshToken});
            this.setTokens(data);
        }
    },

    setTokens({tokens: {accessToken, refreshToken}}: ITokens): void {
        localStorage.setItem(_accessToken, accessToken);
        localStorage.setItem(_refreshToken, refreshToken);
    },

    deleteTokens() {
        localStorage.removeItem(_accessToken);
        localStorage.removeItem(_refreshToken);
    },

    getAccessToken(): string {
        return localStorage.getItem(_accessToken) || "";
    },

    getRefreshToken(): string {
        return localStorage.getItem(_refreshToken) || "";
    },
};

// function setTokens({accessToken, refreshToken}: ITokens): void {
//     localStorage.setItem(_accessToken, JSON.stringify(accessToken));
//     localStorage.setItem(_refreshToken, JSON.stringify(refreshToken));
// }