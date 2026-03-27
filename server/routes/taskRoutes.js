import express from "express";
import {
  getTasksByClient,
  createTask,
  updateTaskStatus
} from "../controllers/taskController.js";

const router = express.Router();

router.get("/:clientId", getTasksByClient);
router.post("/", createTask);
router.put("/:id", updateTaskStatus);

export default router;