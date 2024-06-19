import express from "express";
import * as userController from "../controllers/usersController.js";

const router = express.Router();

router.post("/", userController.createUser);
router.post("/login", userController.loginUser);

export default router;
