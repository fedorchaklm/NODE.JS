import {NextFunction, Request, Response} from "express";
import {userService} from "../services/user.service";

class UserController {
    public findAll = async (_: Request, res: Response, next: NextFunction) => {
        try {
            const users = await userService.findAll();
            res.status(200).json(users);
        } catch (e) {
            next(e);
        }
    }

    public findById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = req.params.id;
            const user = await userService.findById(id);
            res.status(200).json(user);
        } catch (e) {
            next(e);
        }
    }

    public create = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const createdUser = await userService.create(req.body);
            res.status(201).json(createdUser);
        } catch (e) {
            next(e);
        }
    }

    public updateById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const {id} = req.params;
            const updatedUser = await userService.updateById(id, req.body);
            res.status(200).json({message: "User changed", data: updatedUser});
        } catch (e) {
            next(e);
        }
    }

    public deleteById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const {id} = req.params;
            const deletedUser = await userService.deleteById(id);
            res.status(200).json({message: "User deleted", data: deletedUser});
        } catch (e) {
            next(e);
        }
    }
}

export const userController = new UserController();

