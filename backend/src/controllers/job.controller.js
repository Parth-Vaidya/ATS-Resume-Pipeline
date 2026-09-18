import { createJob as createJobService } from "../services/job.service.js";

export const createJob = async (req, res) => {

    try {

        const {
            job_title,
            job_description,
            requirements,
            scoring_config
        } = req.body;

        const job = await createJobService(
            job_title,
            job_description,
            requirements,
            scoring_config
        );

        res.status(201).json({
            message: "Job created successfully",
            data: job
        });

    } catch (error) {

        console.error("Create job error:", error.message);

        res.status(500).json({
            message: "Failed to create job"
        });

    }

};