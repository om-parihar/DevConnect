import express from "express";
import { registUser, loginUser, getMe, updateProfile } from "../controllers/auth.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/register",registUser);
router.post("/login", loginUser);

router.get("/me", protect, getMe);
router.put("/profile", protect, updateProfile);

export default router;