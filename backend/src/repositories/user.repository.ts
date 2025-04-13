import { FilterQuery } from "mongoose";

import {
    IUser,
    IUserCreateDTO,
    IUserQuery,
    IUserUpdateDTO,
} from "../interfaces/user.interface";
import { User } from "../models/user.model";

class UserRepository {
    // use aggregate
    // public getAll = (query: IUserQuery): Promise<Array<any>> => {
    //     const filterObject: FilterQuery<IUser> = { isDeleted: false };
    //
    //     if (query.search) {
    //         filterObject.$or = [
    //             { name: { $regex: query.search, $options: "i" } },
    //             { surname: { $regex: query.search, $options: "i" } },
    //         ];
    //     }
    //
    //     const orderObject: { [key: string]: 1 | -1 } = {};
    //
    //     if (query.order) {
    //         if (query.order.startsWith("-")) {
    //             orderObject[query.order.slice(1)] = -1;
    //         } else {
    //             orderObject[query.order] = 1;
    //         }
    //     }
    //     // return User.find(filterObject).limit(query.pageSize).skip(skip);
    //     return User.aggregate([
    //         {
    //             $match: filterObject,
    //         },
    //         {
    //             $sort: orderObject,
    //         },
    //         {
    //             $group: {
    //                 _id: null,
    //                 totalItems: { $sum: 1 },
    //                 data: { $push: "$$ROOT" },
    //             },
    //         },
    //         {
    //             $project: { _id: 0 },
    //         },
    //     ]);
    // };

    public getAll = (query: IUserQuery): Promise<[Array<IUser>, number]> => {
        const skip = query.pageSize * (query.page - 1);
        const filterObject: FilterQuery<IUser> = { isDeleted: false };

        const orderObject: { [key: string]: 1 | -1 } = {};

        if (query.search) {
            filterObject.$or = [
                { name: { $regex: query.search, $options: "i" } },
                { surname: { $regex: query.search, $options: "i" } },
            ];
        }

        return Promise.all([
            User.find(filterObject, orderObject)
                .limit(query.pageSize)
                .skip(skip)
                .sort(query.order),
            User.find(filterObject, orderObject).countDocuments(),
        ]);
    };

    public getById = (id: string): Promise<IUser | null> => {
        return User.findById(id);
    };

    public create = (user: IUserCreateDTO): Promise<IUser> => {
        return User.create(user);
    };

    public updateById = (
        id: string,
        user: IUserUpdateDTO,
    ): Promise<IUser | null> => {
        return User.findByIdAndUpdate(id, user, { new: true });
    };

    public partialUpdateById = (
        id: string,
        user: Partial<IUser>,
    ): Promise<IUser | null> => {
        return User.findByIdAndUpdate(id, user, { new: true });
    };

    public blockUser = (id: string): Promise<IUser | null> => {
        return User.findByIdAndUpdate(id, { isActive: false }, { new: true });
    };

    public unblockUser = (id: string): Promise<IUser | null> => {
        return User.findByIdAndUpdate(id, { isActive: true }, { new: true });
    };

    public deleteById = (id: string): Promise<IUser | null> => {
        return User.findByIdAndDelete(id);
    };

    public findByEmail = (email: string): Promise<IUser | null> => {
        return User.findOne({ email });
    };
}

export const userRepository = new UserRepository();
