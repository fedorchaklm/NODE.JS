import Joi from "joi";

import { RegexEnum } from "../enums/regex.enum";
import { UserQueryOrderEnum } from "../enums/user-query-order.enum";

export class UserValidator {
    private static email = Joi.string().email().trim();
    private static password = Joi.string().regex(RegexEnum.PASSWORD);
    private static name = Joi.string().min(3).max(10).trim();
    private static surname = Joi.string().regex(RegexEnum.NAME);
    private static age = Joi.number().min(3).max(100);

    public static create = Joi.object({
        email: this.email.required(),
        password: this.password.required(),
        name: this.name.required(),
        surname: this.surname.required(),
        age: this.age.required(),
    });

    public static update = Joi.object({
        name: this.name.required(),
        surname: this.surname.required(),
        age: this.age.required(),
    });

    public static query = Joi.object({
        pageSize: Joi.number().min(1).max(100).default(10),
        page: Joi.number().min(1).default(1),
        search: Joi.string().trim(),
        order: Joi.string().valid(
            ...Object.values(UserQueryOrderEnum),
            ...Object.values(UserQueryOrderEnum).map((item) => `-${item}`),
        ),
    });
}
