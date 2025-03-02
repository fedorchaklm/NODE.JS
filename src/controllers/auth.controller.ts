import {NextFunction, Request, Response} from "express";
import {passwordService} from "../services/password.service";
import {authService} from "../services/auth.service";
import {userService} from "../services/user.service";
import {ApiError} from "../errors/api.error";

class AuthController {
    public register = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const {password, email, ...rest} = req.body;
            const user = await userService.findByEmail(email);
            if (user) {
                throw new ApiError('This email address is already in use', 409);
            }
            const hashedPassword = await passwordService.hash(password);
            await authService.register({password: hashedPassword, email, ...rest});
            res.status(200).json({message: "User has been registered"});
        } catch (e) {
            next(e);
        }
    }
}

export const authController = new AuthController();