import express from "express";
import { protect } from "../middleware/auth.middleware.js";
import { createProject, getProjects, getProjectById, updateProject  } from "../controllers/project.controller.js";

const router = express.Router();

router.post("/",protect, createProject);

router.get("/", protect, getProjects);

router.get("/:id", protect, getProjectById);

router.put("/:id", protect, updateProject);

export default router;