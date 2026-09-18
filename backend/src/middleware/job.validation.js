export const validateCreateJob = (req, res, next) => {

    const {
        job_title,
        job_description,
        requirements
    } = req.body;

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

    if (
        typeof requirements !== "object" ||
        requirements === null ||
        Array.isArray(requirements)
    ) {
        return res.status(400).json({
            message: "requirements must be a valid object"
        });
    }

    next();
};