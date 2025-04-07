import {model, Schema} from "mongoose";

import {RoleEnum} from "../enums/role.enum";
import {IUser} from "../interfaces/user.interface";

const UserSchema = new Schema(
    {
        email: {type: String, unique: true, required: true},
        password: {type: String, required: true},
        role: {
            enum: RoleEnum,
            type: String,
            required: true,
            default: RoleEnum.USER,
        },
        name: {type: String, required: true},
        surname: {type: String, required: true},
        age: {type: String, required: true},
        isDeleted: {type: Boolean, default: false},
        IsVerified: {type: Boolean, default: false},
        isActive: {type: Boolean, default: true},
    },
    {
        timestamps: true, versionKey: false,
        toJSON: {
            transform: (doc, ret) => {
                delete ret.password;
                // ret.id = ret._id;
                // delete ret._id;
                return ret;
            }
        }
    },
);

export const User = model<IUser>("user", UserSchema);
