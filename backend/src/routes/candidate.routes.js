import express from "express";
import { getCandidatesByJobId, getCandidateById, getFraudFlagsByCandidateId } from "../controllers/candidate.controller.js";

const router = express.Router();

router.get("/jobs/:jobId/candidates", getCandidatesByJobId);

router.get("/candidates/:candidateId", getCandidateById);

router.get("/candidates/:candidateId/fraud-flags", getFraudFlagsByCandidateId);

export default router;