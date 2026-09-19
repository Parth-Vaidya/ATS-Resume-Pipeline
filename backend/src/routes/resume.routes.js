import express from "express";
import { uploadResumes } from "../middleware/upload.middleware.js";
import { createCandidate, updateCandidateStatus, updateCandidateResult, createFraudFlag } from "../services/candidate.service.js";
import { getJobById } from "../services/job.service.js";
import { processResume } from "../services/processing.service.js";

const router = express.Router();

router.post("/:jobId/resume", uploadResumes.single("file"),
    async (req, res) => {
        try {
            const { jobId } = req.params;

            const job = await getJobById(jobId);

            const file = req.file;

            const candidate = await createCandidate(
                jobId,
                file.originalname,
                file.path
            );

            await updateCandidateStatus(
                candidate.id,
                "PROCESSING"
            );

            try {
                const processingResult = await processResume(
                    file.path,
                    job.requirements,
                    job.scoring_config
                );

                await updateCandidateResult(
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

                res.status(201).json({
                    message: "Resume processed successfully",
                    candidate: {
                        ...candidate,
                        status: processingResult.status,
                        ats_score: processingResult.ats_score,
                        processing: processingResult
                    }
                });

            } catch (error) {

                console.error(
                    `Processing failed for candidate ${candidate.id}:`,
                    error
                );

                await updateCandidateStatus(
                    candidate.id,
                    "FAILED"
                );

                res.status(500).json({
                    message: "Resume processing failed",
                    candidate_id: candidate.id,
                    status: "FAILED"
                });
            }

        } catch (error) {

            console.error("Resume upload error:", error);

            res.status(500).json({
                message: "Failed to upload resume"
            });
        }
    }
);

export default router;