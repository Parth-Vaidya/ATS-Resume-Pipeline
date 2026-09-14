import pool from "../config/database.js";

export const createJob = async (jobTitle, jobDescription) => {
    const query = `
        INSERT INTO jobs (job_title, job_description)
        VALUES ($1, $2)
        RETURNING *;
    `;

    const values = [jobTitle, jobDescription];

    const result = await pool.query(query, values);

    return result.rows[0];
};