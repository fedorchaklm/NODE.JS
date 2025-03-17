import {User} from "../models/user.model";
import {IUser, IUserDTO} from "../interfaces/user.interface";

class UserRepository {
    public getAll = (): Promise<Array<IUser>> => {
        return User.find();
    }

    public getById = (id: string): Promise<IUser | null> => {
        return User.findById(id);
    }

    public create = (user: IUserDTO): Promise<IUser> => {
        return User.create(user);
    }

    public updateById = (id: string, user: IUser): Promise<IUser | null> => {
        return User.findByIdAndUpdate(id, user, {new: true});
    }

    public deleteById = (id: string): Promise<IUser | null> => {
        return User.findByIdAndDelete(id);
    }
}

export const userRepository = new UserRepository();