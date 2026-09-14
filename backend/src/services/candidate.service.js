import pool from "../config/database.js";

export const createCandidate = async (
    jobId,
    filename,
    filepath
) => {
    const query = `
        INSERT INTO candidates
        (job_id, resume_filename, resume_path)
        VALUES ($1, $2, $3)
        RETURNING *;
    `;

    const values = [jobId, filename, filepath];

    const result = await pool.query(query, values);

    return result.rows[0];
};