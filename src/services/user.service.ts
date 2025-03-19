import { IUser, IUserDTO } from "../interfaces/user.interface";
import { userRepository } from "../repositories/user.repository";

class UserService {
    public getAll = async (): Promise<Array<IUser> | null> => {
        return await userRepository.getAll();
    };

    public getById = async (id: string): Promise<IUser | null> => {
        return await userRepository.getById(id);
    };

    public create = (user: IUserDTO): Promise<IUser> => {
        return userRepository.create(user);
    };

    public updateById = (id: string, user: IUser): Promise<IUser | null> => {
        return userRepository.updateById(id, user);
    };

    public deleteById = (id: string): Promise<IUser | null> => {
        return userRepository.deleteById(id);
    };
}

export const userService = new UserService();
