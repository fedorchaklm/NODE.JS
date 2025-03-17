import express from 'express';
import mongoose from "mongoose";
import {config} from "./config/config";
import {apiRouter} from "./routers/api.router";

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/', apiRouter);

const dbConnection = async () => {
    try {
        await mongoose.connect(config.MONGO_URI);
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection failed');
        process.exit(1);
    }
}

const start = async () => {
    try {
        await dbConnection();
        app.listen(config.PORT, () => {
            console.log(`Server is running on http://localhost:${config.PORT}`);
        });
    } catch (e) {
        console.error('MongoDB connection failed');

    }
}

start();