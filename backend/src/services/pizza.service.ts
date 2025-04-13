import { IPaginatedResponse } from "../interfaces/paginated-response.interface";
import {
    IPizza,
    IPizzaCreateDTO,
    IPizzaQuery,
} from "../interfaces/pizza.interface";
import { pizzaRepository } from "../repositories/pizza.repository";

class PizzaService {
    public getAll = async (
        query: IPizzaQuery,
    ): Promise<IPaginatedResponse<IPizza>> => {
        const [data, totalItems] = await pizzaRepository.getAll(query);
        console.log(">", { query, totalItems, pageSize: query.pageSize });
        const totalPages = Math.ceil(totalItems / query.pageSize);
        return {
            totalItems,
            totalPages,
            prevPage: !!(query.page - 1),
            nextPage: query.page + 1 <= query.page,
            data,
        };
    };

    public create = (pizza: IPizzaCreateDTO): Promise<IPizza> => {
        return pizzaRepository.create(pizza);
    };
}

export const pizzaService = new PizzaService();
