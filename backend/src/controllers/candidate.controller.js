import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
    getCandidatesByJobId as getCandidatesByJobIdService,
    getCandidateById as getCandidateByIdService,
    getFraudFlagsByCandidateId as getFraudFlagsByCandidateIdService
} from "../services/candidate.service.js";

export const getCandidatesByJobId = async (req, res) => {
    try {
        const { jobId } = req.params;

        const candidates = await getCandidatesByJobIdService(jobId);

        res.status(200).json({
            message: "Candidates fetched successfully",
            data: candidates
        });
    } catch (error) {
        console.error("Get candidates error:", error.message);

        res.status(500).json({
            message: "Failed to fetch candidates"
        });
    }
};

export const getCandidateById = async (req, res) => {
    try {
        const { candidateId } = req.params;

        const candidate = await getCandidateByIdService(candidateId);

        res.status(200).json({
            message: "Candidate fetched successfully",
            data: candidate
        });
    } catch (error) {
        console.error("Get candidate error:", error.message);

        res.status(404).json({
            message: "Candidate not found"
        });
    }
};

export const getFraudFlagsByCandidateId = async (req, res) => {
    try {
        const { candidateId } = req.params;

        const fraudFlags =
            await getFraudFlagsByCandidateIdService(candidateId);

        res.status(200).json({
            message: "Fraud flags fetched successfully",
            data: fraudFlags
        });
    } catch (error) {
        console.error(
            "Get fraud flags error:",
            error.message
        );

        res.status(500).json({
            message: "Failed to fetch fraud flags"
        });
    }
};

export const getCandidateResume = async (req, res) => {
    try {
        const { candidateId } = req.params;

        if (!/^[1-9]\d*$/.test(candidateId)) {
            return res.status(400).json({ message: "Invalid candidate ID" });
        }

        const candidate = await getCandidateByIdService(candidateId);

        const storagePath = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../../storage");
        const resumePath = path.resolve(candidate.resume_path);

        if (!resumePath.startsWith(storagePath + path.sep)) {
            return res.status(403).json({ message: "Invalid resume path" });
        }

        await fs.promises.access(resumePath);

        return res.sendFile(resumePath, {
            headers: {
                "Content-Type": "application/pdf",
                "Content-Disposition": "inline"
            }
        });
    } catch (error) {
        if (error.message === "Candidate not found") {
            return res.status(404).json({ message: "Candidate not found" });
        }

        if (error.code === "ENOENT") {
            return res.status(404).json({ message: "Resume file not found" });
        }

        // console.error("Resume retrieval error:", error);
        console.error("Resume retrieval error:", error.message, error.stack);
        return res.status(500).json({ message: "Failed to retrieve resume" });
    }
};