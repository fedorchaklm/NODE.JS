export interface IUser {
    _id: string;
    name: string;
    surname: string;
    age: number;
    createdAt: string;
    updatedAt: string;
}

export type IUserDTO = Pick<IUser, "name" | "surname" | "age">;
