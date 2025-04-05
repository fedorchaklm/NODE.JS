import Joi from "joi";

export class PizzaValidator {
    private static name = Joi.string().min(2).max(55).trim();
    private static price = Joi.number().min(1).max(1000);
    private static diameter = Joi.number().min(1).max(255);

    public static create = Joi.object({
        name: this.name.required(),
        price: this.price.required(),
        diameter: this.diameter.required(),
    });
}
