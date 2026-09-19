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

export const updateCandidateResult = async (
    candidateId,
    status,
    atsScore
) => {
    const query = `
        UPDATE candidates
        SET
            status = $1,
            ats_score = $2
        WHERE id = $3
        RETURNING *;
    `;

    const values = [status, atsScore, candidateId];

    const result = await pool.query(query, values);

    return result.rows[0];
};

export const createFraudFlag = async (
    candidateId,
    fraudFlag
) => {
    const query = `
        INSERT INTO fraud_flags (
            candidate_id,
            type,
            snippet,
            page_number,
            font_color
        )
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *;
    `;

    const values = [
        candidateId,
        fraudFlag.type,
        fraudFlag.snippet,
        fraudFlag.page_number,
        JSON.stringify(fraudFlag.font_color)
    ];

    const result = await pool.query(query, values);

    return result.rows[0];
};