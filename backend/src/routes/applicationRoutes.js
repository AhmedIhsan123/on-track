import express from "express";
import { requireAuth } from "../middleware/authMiddleware.js";
import { getApplications, createApplication, updateApplication, deleteApplication } from "../controllers/applicationController.js";

const router = express.Router();

router.use(requireAuth);

router.get("/", getApplications);
router.post("/", createApplication);
router.put("/:id", updateApplication);
router.delete("/:id", deleteApplication);

export default router;
