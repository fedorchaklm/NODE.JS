import {ApiError} from "../errors/api.error";
import {NextFunction, Request, Response} from "express";

export const errorHandler = (e: ApiError, _: Request, res: Response, next: NextFunction) => {
    const status = e.status || 500;
    console.log(next);
    res.status(status).json({
        message: e.message,
    });
    return;
}