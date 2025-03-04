import {NextFunction, Request, Response} from "express";
import {UserValidator} from "../services/user.validator";
import {ApiError} from "../errors/api.error";

class UserMiddleware {
    public isValidRegisterData = (req: Request, _: Response, next: NextFunction) => {
        try {
            const {error} = UserValidator.createUser.validate(req.body);
            if (error) {
                throw new ApiError('Email or password is not valid', 422);
            }
            next();
        } catch (e) {
            next(e);
        }
    }
}

export const userMiddleware = new UserMiddleware();