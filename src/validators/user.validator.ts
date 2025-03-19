import Joi from "joi";

export class UserValidator {
    private static name = Joi.string().min(3).max(10).trim();
    private static surname = Joi.string().regex(/^[A-Z][a-z]{1,9}$/);
    private static age = Joi.number().min(3).max(100);

    public static create = Joi.object({
        name: this.name.required(),
        surname: this.surname.required(),
        age: this.age.required(),
    });

    public static update = Joi.object({
        name: this.name.required(),
        surname: this.surname.required(),
        age: this.age.required(),
    });
}
