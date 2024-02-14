import { Router } from "express";
import userController from "../../../../controllers/user.controller";
// import verifyToken from '../../../../middleware/middleware';

const userRouter = Router();

// userRouter.get('/', verifyToken, userController.getAllUsers);
// userRouter.get('/:id', verifyToken, userController.getUserById);
// userRouter.get('/email/:email', verifyToken, userController.getUserByEmail);
userRouter.post("/", userController.createUser);
userRouter.post("/login", userController.loginUser);
// userRouter.put('/:id', verifyToken, userController.updateUser);
// userRouter.delete('/:id', verifyToken, userController.deleteUser);

export default userRouter;
