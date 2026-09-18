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