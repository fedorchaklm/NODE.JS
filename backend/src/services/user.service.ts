import { StatusCodesEnum } from "../enums/status.codes.enum";
import { ApiError } from "../errors/api.error";
import { IPaginatedResponse } from "../interfaces/paginated-response.interface";
import {
    IUser,
    IUserCreateDTO,
    IUserQuery,
    IUserUpdateDTO,
} from "../interfaces/user.interface";
import { userRepository } from "../repositories/user.repository";

class UserService {
    public getAll = async (
        query: IUserQuery,
    ): Promise<IPaginatedResponse<IUser>> => {
        const [data, totalItems] = await userRepository.getAll(query);

        const totalPages = Math.ceil(totalItems / query.pageSize);
        return {
            totalItems,
            totalPages,
            prevPage: !!(query.page - 1),
            nextPage: query.page + 1 <= totalPages,
            data,
        };
    };

    public getById = async (id: string): Promise<IUser> => {
        const user = await userRepository.getById(id);
        if (user === null) {
            throw new ApiError("User not found", StatusCodesEnum.NOT_FOUND);
        }
        return user;
    };

    public create = (user: IUserCreateDTO): Promise<IUser> => {
        return userRepository.create(user);
    };

    public updateById = async (
        id: string,
        user: IUserUpdateDTO,
    ): Promise<IUser | null> => {
        const data = await userRepository.getById(id);
        if (data === null) {
            throw new ApiError("User not found", StatusCodesEnum.NOT_FOUND);
        }
        return await userRepository.updateById(id, user);
    };

    public partialUpdateById = async (
        id: string,
        user: Partial<IUser>,
    ): Promise<IUser> => {
        const data = await userRepository.getById(id);
        if (data === null) {
            throw new ApiError("User not found", StatusCodesEnum.NOT_FOUND);
        }

        const updatedUser = await userRepository.partialUpdateById(id, user);
        if (updatedUser === null) {
            throw new ApiError("User not found", StatusCodesEnum.NOT_FOUND);
        }
        return updatedUser;
    };

    public blockUser = async (id: string): Promise<IUser | null> => {
        const user = await userRepository.getById(id);
        if (user === null) {
            throw new ApiError("User not found", StatusCodesEnum.NOT_FOUND);
        }
        return await userRepository.blockUser(id);
    };

    public unblockUser = async (id: string): Promise<IUser | null> => {
        const user = await userRepository.getById(id);
        if (user === null) {
            throw new ApiError("User not found", StatusCodesEnum.NOT_FOUND);
        }
        return await userRepository.unblockUser(id);
    };

    public deleteById = async (id: string): Promise<IUser | null> => {
        const user = await userRepository.getById(id);
        if (user === null) {
            throw new ApiError("User not found", StatusCodesEnum.NOT_FOUND);
        }
        return await userRepository.deleteById(id);
    };

    public isEmailUnique = async (email: string) => {
        const user = await userRepository.findByEmail(email);

        if (user !== null) {
            throw new ApiError(
                "User is already exists",
                StatusCodesEnum.BAD_REQUEST,
            );
        }
    };

    public isActive = async (id: string): Promise<boolean> => {
        const user = await this.getById(id);
        return user.isActive;
    };

    public getByEmail = async (email: string): Promise<IUser | null> => {
        return await userRepository.findByEmail(email);
    };
}

export const userService = new UserService();
