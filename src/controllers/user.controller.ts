import {NextFunction, Request, Response} from "express";
import {usersDb} from "../db/users.db";

class UserController {
    public findAll = async (_: Request, res: Response, next: NextFunction) => {
        try {
            res.json(usersDb);
        } catch (e) {
            next(e);
        }
    }

    public create = (req: Request, res: Response,) => {
        const user = req.body;
        usersDb.push(user);
        res.status(201).json({message: "Added user"});
    }

    public updateById = (req: Request, res: Response,) => {
        const {id} = req.params;
        const user = req.body;
        usersDb[+id] = user;
        res.status(200).json({message: "User changed", data: user});
    }

    public deleteById = (req: Request, res: Response) => {
        const {id} = req.params;
        const deletedUser = usersDb[+id];
        usersDb.splice(+id, 1)
        res.status(200).json({message: "User deleted", data: deletedUser});
    }
}

export const userController = new UserController();

