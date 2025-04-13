import { Router } from "express";

import { authMiddleware } from "@/middleware/authMiddleware";

import * as userController from "@/controller/api";

const router = Router();

router.use(authMiddleware);

router.post("/init-user-data", userController.initUserData);

router.get("/fetch-user-data/:userId", userController.fetchUserData);

router.put("/update-user-data/:userId", userController.updateUserData);

export default router;
