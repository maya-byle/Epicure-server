import { Router } from "express";
import userController from "../../../../controllers/user.controller";
import verifyToken from "../../../../middleware/middleware";

const userRouter = Router();

userRouter.post("/login", userController.loginUser);
userRouter.get("/", verifyToken, userController.getAllUsers);
userRouter.post("/", verifyToken, userController.createUser);
userRouter.put("/:id", verifyToken, userController.updateUser);
userRouter.delete("/:id", verifyToken, userController.deleteUser);

export default userRouter;
