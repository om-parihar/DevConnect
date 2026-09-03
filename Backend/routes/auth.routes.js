import express from "express";
import { registUser, loginUser } from "../controllers/auth.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/register",registUser);

router.post("/login", loginUser);

router.get("/me", protect, (req,res)=>{
    res.json({
        success: true,
        user: req.user
    });
});

export default router;