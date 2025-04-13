import Joi from "joi";

import { PizzaQueryOrderEnum } from "../enums/pizza-query-order.enum";

export class PizzaValidator {
    private static name = Joi.string().min(2).max(55).trim();
    private static price = Joi.number().min(1).max(1000);
    private static diameter = Joi.number().min(1).max(255);

    public static create = Joi.object({
        name: this.name.required(),
        price: this.price.required(),
        diameter: this.diameter.required(),
    });

    public static query = Joi.object({
        pageSize: Joi.number().min(1).max(100).default(10),
        page: Joi.number().min(1).default(1),
        name: Joi.string().trim(),
        price: Joi.number().valid(
            ...Object.values(PizzaQueryOrderEnum),
            ...Object.values(PizzaQueryOrderEnum).map((item) => `-${item}`),
        ),
    });
}
