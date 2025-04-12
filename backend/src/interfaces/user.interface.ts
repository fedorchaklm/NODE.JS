import {IBase} from "./base.interface";

export interface IUser extends IBase {
    _id: string;
    email: string;
    password: string;
    role: string;
    name: string;
    surname: string;
    age: number;
    avatar: string;
    createdAt: string;
    updatedAt: string;
    isDeleted: boolean;
    isVerified: boolean;
    isActive: boolean;
}

export interface IUserQuery {
    pageSize: number;
    page: number;
    search?: string;
    orderBy?: string;
}

export type IUserCreateDTO = Pick<
    IUser,
    "name" | "surname" | "age" | "email" | "password"
>;

export type IUserUpdateDTO = Pick<IUser, "name" | "surname" | "age">;
