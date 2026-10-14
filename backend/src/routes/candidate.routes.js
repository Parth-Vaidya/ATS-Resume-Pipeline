import express from "express";
import { getCandidatesByJobId, getCandidateById, getFraudFlagsByCandidateId, getCandidateResume } from "../controllers/candidate.controller.js";

const router = express.Router();

router.get("/jobs/:jobId/candidates", getCandidatesByJobId);

router.get("/candidates/:candidateId", getCandidateById);

router.get("/candidates/:candidateId/fraud-flags", getFraudFlagsByCandidateId);

router.get("/candidates/:candidateId/resume", getCandidateResume);

export default router;