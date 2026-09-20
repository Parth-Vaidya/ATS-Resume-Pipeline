import pool from "../config/database.js";

export const createJob = async (
    jobTitle,
    jobDescription,
    requirements,
    scoringConfig
) => {

    const query = `
        INSERT INTO jobs (
            job_title,
            job_description,
            requirements,
            scoring_config
        )
        VALUES ($1, $2, $3, $4)
        RETURNING *;
    `;

    const values = [
        jobTitle,
        jobDescription,
        requirements,
        scoringConfig
    ];

    const result = await pool.query(query, values);

    return result.rows[0];
};

export const getJobById = async (jobId) => {
    const query = `
        SELECT *
        FROM jobs
        WHERE id = $1;
    `;

    const result = await pool.query(query, [jobId]);

    if (result.rows.length === 0) {
        throw new Error("Job not found");
    }

    return result.rows[0];
};

export const getJobs = async () => {
    const query = `
        SELECT *
        FROM jobs
        ORDER BY created_at DESC;
    `;

    const result = await pool.query(query);

    return result.rows;
};