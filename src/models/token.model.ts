import mongoose, { Schema } from "mongoose";

const tokenSchema = new Schema(
    {
        accessToken: { type: String, required: true },
        refreshToken: { type: String, required: true },
        _userId: { type: Schema.Types.ObjectId, required: true },
    },
    { timestamps: true, versionKey: false },
);

export const Token = mongoose.model("tokens", tokenSchema);
