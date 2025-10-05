import { Router } from "express";
import { UsersController } from "../controllers/users.controller";
import {
  authMiddleware,
  ownDataMiddleware,
} from "../middleware/auth.middleware";
import { UserRole } from "../enums/user.roles";

const router = Router();
const usersController = new UsersController();

router.get(
  "/:id",
  authMiddleware, 
  ownDataMiddleware,
  usersController.getUser.bind(usersController)
);

export default router;
