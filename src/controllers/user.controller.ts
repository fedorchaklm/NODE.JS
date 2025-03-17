import {Request, Response} from "express";
import {userService} from "../services/user.service";
import {IUser} from "../interfaces/user.interface";
import {StatusCodesEnum} from "../enums/status.codes.enum";

class UserController {
    public getAll = async (_: Request, res: Response<Array<IUser> | null>) => {
        const users = await userService.getAll();
        res.status(StatusCodesEnum.OK).json(users);
    }

    public getById = async (req: Request, res: Response<IUser | null>) => {
        const {id} = req.params;
        const user = await userService.getById(id);
        res.status(StatusCodesEnum.OK).json(user);
    }

    public create = async (req: Request, res: Response<IUser | null>) => {
        const user = await userService.create(req.body);
        res.status(StatusCodesEnum.CREATED).json(user);
    }

    public updateById = async (req: Request, res: Response<IUser | null>) => {
        const {id} = req.params;
        const user = await userService.updateById(id, req.body);
        res.status(StatusCodesEnum.OK).json(user);
    }

    public deleteById = async (req: Request, res: Response) => {
        const {id} = req.params;
        await userService.deleteById(id);
        res.status(StatusCodesEnum.NO_CONTENT).end();
    }
}

export const userController = new UserController();