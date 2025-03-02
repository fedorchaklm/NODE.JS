import {userRepository} from "../repositories/user.repository";
import {IUser} from "../types/IUser";
import {ApiError} from "../errors/api.error";

class UserService {
    public findAll = async (): Promise<Array<IUser>> => {
        return await userRepository.findAll();
    }

    public findById = async (id: string): Promise<IUser> => {
        const user = await userRepository.findById(id);
        if (user === null) {
            throw new ApiError('User was not found', 404);
        }
        return user;
    }

    public create = async (user: Omit<IUser, "_id">): Promise<IUser> => {
        return await userRepository.create(user);
    }

    public updateById = async (id: string, data: Partial<IUser>): Promise<IUser | null> => {
        const user = await userRepository.findById(id);
        if (user === null) {
            throw new ApiError('User was not found', 404);
        }
        return await userRepository.updateById(id, data);
    }

    public deleteById = async (id: string): Promise<IUser | null> => {
        const user = await userRepository.findById(id);
        if (user === null) {
            throw new ApiError('User was not found', 404);
        }
        return await userRepository.deleteById(id);
    }
}

export const userService = new UserService();