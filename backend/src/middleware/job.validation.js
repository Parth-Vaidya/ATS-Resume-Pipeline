export const validateCreateJob = (req, res, next) => {
    const { job_title, job_description } = req.body;

    if (
        typeof job_title !== "string" ||
        job_title.trim() === ""
    ) {
        return res.status(400).json({
            message: "job_title is required"
        });
    }

    if (
        typeof job_description !== "string" ||
        job_description.trim() === ""
    ) {
        return res.status(400).json({
            message: "job_description is required"
        });
    }

    next();
};