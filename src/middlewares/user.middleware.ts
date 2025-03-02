import {Request, Response, NextFunction} from "express";
import {usersDb} from "../db/users.db";
import {ApiError} from "../errors/api.error";

class UserMiddleware {
    public findByIdOrThrowError = async (req: Request, _: Response, next: NextFunction) => {
        try {
            const {id} = req.params;
            const user = usersDb[+id];
            console.log({user});
            if (!user) {
                throw new ApiError(`User was not found with such id = ${id}`, 404);
            }
            next();
        } catch (e) {
            console.log('here');
            next(e);
        }
    }
}

export const userMiddleware = new UserMiddleware();