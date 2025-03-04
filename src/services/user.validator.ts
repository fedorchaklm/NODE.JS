import Joi from 'joi';

export class UserValidator {
    public static email = Joi.string()
        .max(254)
        .pattern(new RegExp("^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+.[a-z]{2,}$"));

    public static password = Joi.string()
        .min(8)
        .pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/)

    static createUser = Joi.object({
        email: this.email.required(),
        password: this.password.required()
    });
}