import { NextFunction, Request, Response } from "express";

import { StatusCodesEnum } from "../enums/status.codes.enum";
import { IPizzaCreateDTO, IPizzaQuery } from "../interfaces/pizza.interface";
import { pizzaService } from "../services/pizza.service";

class PizzaController {
    public getAll = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const query = req.query as any as IPizzaQuery;
            const pizzas = await pizzaService.getAll(query);
            res.status(StatusCodesEnum.OK).json(pizzas);
        } catch (e) {
            next(e);
        }
    };

    public create = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const data = req.body as IPizzaCreateDTO;
            const pizza = await pizzaService.create(data);
            res.status(StatusCodesEnum.CREATED).json(pizza);
        } catch (e) {
            next(e);
        }
    };
}

export const pizzaController = new PizzaController();
