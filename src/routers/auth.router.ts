import {Router} from 'express';
import {authController} from "../controllers/auth.controller";
import {userMiddleware} from "../middlewares/user.middleware";

const router = Router();

router.post('/register', userMiddleware.isValidRegisterData, authController.register);

export default router;