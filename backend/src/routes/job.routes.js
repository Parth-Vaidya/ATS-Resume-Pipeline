import express from "express";
import { createJob } from "../controllers/job.controller.js";
import { validateCreateJob } from "../middleware/job.validation.js";

const router = express.Router();

router.post("/", validateCreateJob, createJob);

export default router;