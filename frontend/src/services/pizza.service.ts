import {urls} from "../constants/urls";
import {IPizza} from "../interfaces/IPizza";
import {axiosInstance} from "./api.service";
import {ResType} from "../interfaces/ResType";

export const pizzaService = {
    getAll: (): ResType<Array<IPizza>> => {
        return axiosInstance.get<Array<IPizza>>(urls.pizzas);
    },

    create: (pizza: Omit<IPizza, "_id">): ResType<IPizza> => {
        return axiosInstance.post<IPizza>(urls.pizzas, pizza);
    }
}