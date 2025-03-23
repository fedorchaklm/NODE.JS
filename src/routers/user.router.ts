import { Router } from "express";

import { userController } from "../controllers/user.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { commonMiddleware } from "../middlewares/common.middleware";
import { UserValidator } from "../validators/user.validator";

const router = Router();

router.get("/", userController.getAll);
// router.post(
//     "/",
//     commonMiddleware.validateBody(UserValidator.create),
//     userController.create,
// );
router.get("/:id", commonMiddleware.isValidId("id"), userController.getById);
router.put(
    "/:id",
    commonMiddleware.isValidId("id"),
    commonMiddleware.validateBody(UserValidator.update),
    authMiddleware.checkAccessToken,
    userController.updateById,
);
router.delete(
    "/:id",
    commonMiddleware.isValidId("id"),
    authMiddleware.checkAccessToken,
    userController.deleteById,
);

export const userRouter = router;
