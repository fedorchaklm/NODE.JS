import {Router} from "express";
import {userController} from "../controllers/user.controller";
import {userMiddleware} from "../middlewares/user.middleware";

const router = Router();

router.get('/', userController.findAll);

router.post('/', userController.create);

router.put('/:id', userMiddleware.findByIdOrThrowError, userController.updateById);

router.delete('/:id', userMiddleware.findByIdOrThrowError, userController.deleteById);

export default router;