import express from "express";
import multer from "multer";
import path from "node:path";
import fs from "fs/promises";
import { uploadResumes } from "../middleware/upload.middleware.js";
import { createCandidate, updateCandidateStatus, updateCandidateResult, createFraudFlag } from "../services/candidate.service.js";
import { getJobById } from "../services/job.service.js";
import { processResume } from "../services/processing.service.js";

const router = express.Router();

const validateJobBeforeUpload = async (req, res, next) => {
    const { jobId } = req.params;

    //if jobID is not a positive integer, return 400
    if (!/^[1-9]\d*$/.test(jobId)) {
        return res.status(400).json({ message: "Invalid job ID" });
    }

    try {
        req.job = await getJobById(jobId);
        next();
    } catch (error) {
        if (error.message === "Job not found") {
            return res.status(404).json({ message: "Job not found" });
        }
        next(error);
    }
};

router.post("/:jobId/resume", validateJobBeforeUpload, uploadResumes.single("file"),
    async (req, res) => {
        try {
            const { jobId } = req.params;

            const job = req.job;

            let uploadedFile;
            let candidateCreated = false;
            const file = req.file;
            uploadedFile = file;

            if (!file) {
                return res.status(400).json({
                    message: "Please upload a PDF using the 'file' field"
                });
            }

            // Validate the PDF file by checking its signature (so that renamed .txt files to .pdf are not accepted)
            const fileHandle = await fs.open(file.path, "r");
            let isValidPdf = false;

            try {
                const signature = Buffer.alloc(5);
                const { bytesRead } = await fileHandle.read(
                    signature,
                    0,
                    5,
                    0
                );

                isValidPdf =
                    bytesRead === 5 &&
                    signature.toString("ascii") === "%PDF-";
            } finally {
                await fileHandle.close();
            }

            if (!isValidPdf) {
                await fs.unlink(file.path);
                uploadedFile = null;

                return res.status(400).json({
                    message: "Invalid PDF file"
                });
            }

            const candidate = await createCandidate(
                jobId,
                file.originalname,
                file.path
            );
            candidateCreated = true;

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

                try {
                    await updateCandidateStatus(
                        candidate.id,
                        "FAILED"
                    );
                } catch (statusError) {
                    console.error(
                        "Failed to update candidate status:",
                        statusError.message
                    );
                }

                return res.status(500).json({
                    message: "Resume processing failed",
                    candidate_id: candidate.id,
                    status: "FAILED"
                });
            }
        } catch (error) {
            console.error("Resume upload error:", error);

            if (uploadedFile && candidateCreated === false) {
                try {
                    await fs.unlink(uploadedFile.path);
                } catch (cleanupError) {
                    if (cleanupError.code !== "ENOENT") {
                        console.error(
                            "File cleanup failed:",
                            cleanupError.message
                        );
                    }
                }
            }

            return res.status(500).json({
                message: "Failed to upload resume"
            });
        }
    }
);

router.use((error, req, res, next) => {
    if (error instanceof multer.MulterError) {
        if (error.code === "LIMIT_FILE_SIZE") {
            return res.status(413).json({
                message: "Resume must not exceed 5 MB"
            });
        }

        return res.status(400).json({
            message: error.message
        });
    }

    if (error.message === "Only PDF files are allowed") {
        return res.status(400).json({
            message: error.message
        });
    }

    next(error);
});

export default router;