import { userController } from "@/controller/api";
import { authMiddleware } from "@/middleware/authMiddleware";
import { Router } from "express";

const router = Router();

router.use(authMiddleware);

router.get("/fetch-user-data/:userId", userController.fetchUserData);

router.put("/update-user-data/:userId", userController.updateUserData);

export default router;
