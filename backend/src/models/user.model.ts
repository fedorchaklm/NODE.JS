import {model, Schema} from "mongoose";

import {RoleEnum} from "../enums/role.enum";
import {IUser} from "../interfaces/user.interface";
import path from "path";

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
        avatar: {type: String, default: "" },
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
                if(ret.avatar) {
                    ret.avatar = `media/${path.basename(ret.avatar)}`;
                }
                return ret;
            }
        }
    },
);

export const User = model<IUser>("user", UserSchema);
