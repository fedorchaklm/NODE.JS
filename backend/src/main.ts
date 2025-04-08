/*eslint-disable no-console */
/*eslint-disable @typescript-eslint/no-unused-vars*/
import express, {NextFunction, Request, Response} from "express";
import mongoose from "mongoose";
import cors from "cors";

import {config} from "./config/config";
import {ApiError} from "./errors/api.error";
import {apiRouter} from "./routers/api.router";
import path from "path";

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors({
    origin: ["http://localhost:3000"]
}));
app.use('/media', express.static(path.join(process.cwd(), "upload")));

app.use("/", apiRouter);
app.use(
    "*",
    (err: ApiError, req: Request, res: Response, next: NextFunction) => {
        const status = err.status || 500;
        const message = err.message ?? "Something went wrong";
        res.status(status).json({status, message});
    },
);

process.on("uncaughtException", (err) => {
    console.log("uncaughtException", err);
    process.exit(1);
});

const dbConnection = async () => {
    try {
        await mongoose.connect(config.MONGO_URI);
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error("MongoDB connection failed");
        process.exit(1);
    }
};

const start = async () => {
    try {
        await dbConnection();
        app.listen(config.PORT, () => {
            console.log(`Server is running on http://localhost:${config.PORT}`);
        });
    } catch (e) {
        console.error("MongoDB connection failed");
    }
};

start();
