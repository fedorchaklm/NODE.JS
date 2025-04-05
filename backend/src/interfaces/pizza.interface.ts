import { IBase } from "./base.interface";

export interface IPizza extends IBase {
    _id: string;
    name: string;
    price: number;
    diametric: number;
}

export type IPizzaCreateDTO = Pick<IPizza, "name" | "price" | "diametric">;
