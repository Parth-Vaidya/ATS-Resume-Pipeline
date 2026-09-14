import express from "express";
import { uploadResumes } from "../middleware/upload.middleware.js";
import { createCandidate } from "../services/candidate.service.js";

const router = express.Router();

router.post("/:jobId/resumes", uploadResumes.array("files", 10),
    async (req, res) => {
        try {
            const { jobId } = req.params;

            const candidates = [];

            for (const file of req.files) {
                const candidate = await createCandidate(
                    jobId,
                    file.originalname,
                    file.path
                );

                candidates.push(candidate);
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