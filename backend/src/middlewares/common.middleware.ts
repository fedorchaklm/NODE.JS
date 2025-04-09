import {NextFunction, Request, Response} from "express";
import Joi, {ObjectSchema} from "joi";
import {isObjectIdOrHexString} from "mongoose";

import {StatusCodesEnum} from "../enums/status.codes.enum";
import {ApiError} from "../errors/api.error";

class CommonMiddleware {
    public isValidId = (key: string) => {
        return (req: Request, _: Response, next: NextFunction) => {
            try {
                const id = req.params[key];
                if (!isObjectIdOrHexString(id)) {
                    new ApiError(
                        `Invalid ${key}: ${id}`,
                        StatusCodesEnum.BAD_REQUEST,
                    );
                }
                next();
            } catch (e) {
                next(e);
            }
        };
    };

    public validateBody(validator: ObjectSchema) {
        return async (req: Request, _: Response, next: NextFunction) => {
            try {
                req.body = await validator.validateAsync(req.body);
                next();
            } catch (e) {
                if (e instanceof Joi.ValidationError) {
                    next(new ApiError(e.details[0].message, 400));
                }
            }
        };
    }

    public isFileExists = () => {
        return async (req: Request, res: Response, next: NextFunction) => {
            try {
                if (!req.file) {
                    throw new ApiError("Not file uploaded", StatusCodesEnum.BAD_REQUEST)
                }
                next();
            } catch (e) {
                next(e);
            }
        }
    }
}

export const commonMiddleware = new CommonMiddleware();
