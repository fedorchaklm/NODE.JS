import express from 'express';
import mongoose from 'mongoose';
import userRouter from "./routers/user.router";
import {errorHandler} from "./middlewares/errorHandler";

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/users', userRouter);

// app.use((e: ApiError, req: Request, res: Response, next: NextFunction) => {
//     const status = e.status || 500;
//     return res.status(status).json({
//         message: e.message,
//     });
// });

app.use(errorHandler);

const PORT = 5100;

export const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/db');
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection failed');
        process.exit(1);
    }
};

app.listen(PORT, async () => {
    await connectDB()
    console.log(`Server is running on http://localhost:${PORT}`)
});