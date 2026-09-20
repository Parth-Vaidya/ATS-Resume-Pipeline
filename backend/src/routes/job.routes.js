import express from "express";
import { createJob, getJobs, getJobById } from "../controllers/job.controller.js";
import { validateCreateJob } from "../middleware/job.validation.js";

const router = express.Router();

router.post("/", validateCreateJob, createJob);

router.get("/", getJobs);

router.get("/:jobId", getJobById);

export default router;