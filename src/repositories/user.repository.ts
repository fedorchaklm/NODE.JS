import {UserModel} from "../models/user.model";
import {IUser} from "../types/IUser";

class UserRepository {
    public findAll = async (): Promise<Array<IUser>> => {
        return await UserModel.find() as unknown as IUser[];
    }

    public findById = async (id: string): Promise<IUser | null> => {
        return await UserModel.findOne({_id: id})
    }

    public create = async (user: Omit<IUser, "_id">): Promise<IUser> => {
        return await UserModel.create({...user}) as unknown as IUser;
    }

    public updateById = async (id: string, data: Partial<IUser>): Promise<IUser | null> => {
        return await UserModel.findOneAndUpdate({_id: id}, {...data}, {returnDocument: 'after'})
    }

    public deleteById = async (id: string): Promise<IUser | null> => {
        return await UserModel.findOneAndDelete({_id: id}, {returnDocument: 'after'});
    }
}

export const userRepository = new UserRepository();