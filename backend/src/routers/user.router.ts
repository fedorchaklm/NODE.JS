import {Router} from "express";

import {userController} from "../controllers/user.controller";
import {authMiddleware} from "../middlewares/auth.middleware";
import {commonMiddleware} from "../middlewares/common.middleware";
import {UserValidator} from "../validators/user.validator";
import {upload} from "../config/multer.config";

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

router.patch(
    "/:id/block",
    commonMiddleware.isValidId("id"),
    authMiddleware.checkAccessToken,
    authMiddleware.isAdmin,
    userController.blockUser,
);

router.patch(
    "/:id/unblock",
    commonMiddleware.isValidId("id"),
    authMiddleware.checkAccessToken,
    authMiddleware.isAdmin,
    userController.unBlockUser,
);

router.delete(
    "/:id",
    commonMiddleware.isValidId("id"),
    authMiddleware.checkAccessToken,
    userController.deleteById,
);

router.patch(
    "/upload-avatar/:id",
    commonMiddleware.isValidId("id"),
    upload.single("avatar"),
    userController.uploadAvatar);

export const userRouter = router;
