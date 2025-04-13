import { IBase } from "./base.interface";

export interface IPizza extends IBase {
    _id: string;
    name: string;
    price: number;
    diametric: number;
}

export interface IPizzaQuery {
    pageSize: number;
    page: number;
    name?: string;
    price?: number;
    diameter?: number;
    order?: string;
}

export type IPizzaCreateDTO = Pick<IPizza, "name" | "price" | "diametric">;
