import {urls} from "../constants/urls";
import {IPizza} from "../interfaces/IPizza";
import {axiosInstance} from "./api.service";
import {ResType} from "../interfaces/ResType";
import {authService} from "./auth.service";

// const accessToken = JSON.parse(authService.getAccessToken());
// console.log({accessToken});
// if (accessToken) {
//     request.headers.Authorization = `Bearer ` + accessToken;
// }
//
// return request;

export const pizzaService = {
    getAll: async (): Promise<{ data: Array<IPizza> }> => {
        const accessToken = authService.getAccessToken();
        console.log('> pizzaService', { accessToken });
        const res = await fetch('/api/pizzas', {
            credentials: 'include',
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        const data = await res.json();
        return { data };
        // return axiosInstance.get<Array<IPizza>>(urls.pizzas);
    },

    create: (pizza: Omit<IPizza, "_id">): ResType<IPizza> => {
        return axiosInstance.post<IPizza>(urls.pizzas, pizza);
    }
}