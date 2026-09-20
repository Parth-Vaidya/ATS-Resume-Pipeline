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