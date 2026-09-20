import { 
    createJob as createJobService, 
    getJobs as getJobsService, 
    getJobById as getJobByIdService
} from "../services/job.service.js";

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

export const getJobById = async (req, res) => {
    try {
        const { jobId } = req.params;

        const job = await getJobByIdService(jobId);

        res.status(200).json({
            message: "Job fetched successfully",
            data: job
        });
    } catch (error) {
        console.error("Get job error:", error.message);

        res.status(404).json({
            message: "Job not found"
        });
    }
};

export const getJobs = async (req, res) => {
    try {
        const jobs = await getJobsService();

        res.status(200).json({
            message: "Jobs fetched successfully",
            data: jobs
        });
    } catch (error) {
        console.error("Get jobs error:", error.message);

        res.status(500).json({
            message: "Failed to fetch jobs"
        });
    }
};

