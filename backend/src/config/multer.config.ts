import multer, {FileFilterCallback} from "multer";
import {Request} from "express";
import path from "node:path";
import {v6} from "uuid";
import {ApiError} from "../errors/api.error";
import {StatusCodesEnum} from "../enums/status.codes.enum";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(process.cwd(), "uploads"));
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = v6();
        const ext = path.extname(file.originalname);
        cb(null, `${uniqueSuffix}${ext}`);
    }
});

const fileFilter = (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
    const allowedTypes = /.jpeg|.jpg|.png|.gif/;
    const extname = allowedTypes.test(path.extname(file.originalname));
    const mimetype = allowedTypes.test(file.mimetype);

    if (extname && mimetype) {
        cb(null, true);
    } else {
        cb(new ApiError("Only images allowed", StatusCodesEnum.BAD_REQUEST));
    }
}

export const upload = multer({
    storage: storage,
    limits: {fileSize: 5 * 1024 * 1024},
    fileFilter: fileFilter,
})