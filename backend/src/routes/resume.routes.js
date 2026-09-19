import express from "express";
import { uploadResumes } from "../middleware/upload.middleware.js";
import { createCandidate, updateCandidateResult, createFraudFlag } from "../services/candidate.service.js";
import { getJobById } from "../services/job.service.js";
import { processResume } from "../services/processing.service.js";

const router = express.Router();

router.post("/:jobId/resumes", uploadResumes.array("files", 10),
    async (req, res) => {
        try {
            const { jobId } = req.params;
            const job = await getJobById(jobId);
            const candidates = [];

            for (const file of req.files) {
                const candidate = await createCandidate(
                    jobId,
                    file.originalname,
                    file.path
                );

                const processingResult = await processResume(
                    file.path,
                    job.requirements,
                    job.scoring_config
                );

                const updatedCandidate = await updateCandidateResult(
                    candidate.id,
                    processingResult.status,
                    processingResult.ats_score
                );

                for (const fraudFlag of processingResult.fraud_flags) {
                    await createFraudFlag(
                        candidate.id,
                        fraudFlag
                    );
                }
                candidates.push({
                    ...candidate,
                    status: processingResult.status,
                    ats_score: processingResult.ats_score,
                    processing: processingResult
                });
            }

            res.status(201).json({
                message: "Resumes uploaded successfully",
                candidates
            });

        } catch (error) {
            console.error("Resume upload error:", error);

            res.status(500).json({
                message: "Failed to save resume"
            });
        }
    }
);

export default router;