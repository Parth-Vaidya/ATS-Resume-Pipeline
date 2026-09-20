# API Documentation

This document describes the currently implemented REST APIs of the ATS Resume Shortlisting & Anti-Fraud Pipeline.

## Base URL

```text
http://localhost:5000
```

## API Overview

| Method | Endpoint | Purpose |
| --- | --- | --- |
| `POST` | `/api/jobs` | Create a new job |
| `GET` | `/api/jobs` | Get all jobs |
| `GET` | `/api/jobs/:jobId` | Get a specific job |
| `POST` | `/api/jobs/:jobId/resume` | Upload and process a resume |
| `GET` | `/api/jobs/:jobId/candidates` | Get candidates for a job |
| `GET` | `/api/candidates/:candidateId` | Get a specific candidate |
| `GET` | `/api/candidates/:candidateId/fraud-flags` | Get fraud flags for a candidate |

## Endpoints

### 1. Create Job

`POST /api/jobs`

Creates a new job and stores its recruiter-defined requirements and scoring configuration.

#### Request Body

**Content-Type:** `application/json`

**Example:**

```json
{
    "job_title": "Backend Developer",
    "job_description": "Looking for a backend developer to build REST APIs and database systems.",
    "requirements": {
        "required_skills": [
            "Node.js",
            "Express.js",
            "PostgreSQL"
        ],
        "preferred_skills": [
            "Docker",
            "Redis"
        ],
        "languages": [
            "JavaScript"
        ],
        "keywords": [
            "REST API",
            "backend",
            "database"
        ]
    },
    "scoring_config": {
        "required_skills": 50,
        "preferred_skills": 20,
        "languages": 15,
        "keywords": 15
    }
}
```

#### Response

**Status:** `201 Created`

**Example:**

```json
{
    "message": "Job created successfully",
    "data": {
        "id": 11,
        "job_title": "Backend Developer",
        "job_description": "...",
        "status": "CREATED",
        "requirements": {},
        "scoring_config": {}
    }
}
```

The generated job ID can be used for resume processing and candidate retrieval.

---

### 2. Get All Jobs

`GET /api/jobs`

Returns all jobs stored in the database. Jobs are ordered by creation time, with the newest jobs returned first.

#### Response

**Status:** `200 OK`

**Example:**

```json
{
    "message": "Jobs fetched successfully",
    "data": [
        {
            "id": 11,
            "job_title": "Backend Developer",
            "job_description": "...",
            "status": "CREATED",
            "created_at": "...",
            "completed_at": null,
            "requirements": {},
            "scoring_config": {}
        }
    ]
}
```

**If no jobs exist:**

```json
{
    "message": "Jobs fetched successfully",
    "data": []
}
```

---

### 3. Get Job by ID

`GET /api/jobs/:jobId`

Returns information about a specific job.

#### Example Request

`GET /api/jobs/11`

#### Response

**Status:** `200 OK`

**Example:**

```json
{
    "message": "Job fetched successfully",
    "data": {
        "id": 11,
        "job_title": "Backend Developer",
        "job_description": "...",
        "status": "CREATED",
        "created_at": "...",
        "completed_at": null,
        "requirements": {},
        "scoring_config": {}
    }
}
```

#### Job Not Found

If the specified job does not exist:

**Status:** `404 Not Found`

```json
{
    "message": "Job not found"
}
```

---

### 4. Upload and Process Resume

`POST /api/jobs/:jobId/resume`

Uploads a single PDF resume and processes it against the selected job.

#### Request

**Content-Type:** `multipart/form-data`

**Form field:** `file` (Must contain a PDF resume)

#### Example Request

`POST /api/jobs/11/resume`

| Key | Type | Value |
| --- | --- | --- |
| `file` | File | `resume.pdf` |

#### Processing Flow

The endpoint performs the following operations:

1. Validates the uploaded PDF.
2. Verifies that the job exists.
3. Creates a candidate record.
4. Sets candidate status to `PROCESSING`.
5. Sends the resume to the Python processor.
6. Extracts PDF text.
7. Performs fraud detection.
8. Matches recruiter-defined requirements.
9. Calculates the ATS score.
10. Stores the processing result.
11. Returns the result to the client.

#### Accepted Resume

A clean resume receives `status = ACCEPTED` and a calculated ATS score.

**Example:**

```json
{
    "message": "Resume processed successfully",
    "candidate": {
        "id": 10,
        "job_id": 11,
        "status": "ACCEPTED",
        "ats_score": 80,
        "processing": {
            "status": "ACCEPTED",
            "ats_score": 80,
            "fraud_flags": [],
            "matching": {}
        }
    }
}
```

#### Rejected Resume

If fraud is detected:

- `status = REJECTED`
- `ats_score = 0`
- Fraud evidence is returned in `fraud_flags`.

#### Processing Failure

If an unexpected processing error occurs: `status = FAILED`.

---

### 5. Get Candidates for a Job

`GET /api/jobs/:jobId/candidates`

Returns all candidates associated with a specific job.

#### Example Request

`GET /api/jobs/11/candidates`

#### Response

**Status:** `200 OK`

**Example:**

```json
{
    "message": "Candidates fetched successfully",
    "data": [
        {
            "id": 10,
            "job_id": 11,
            "name": null,
            "email": null,
            "resume_filename": "resume.pdf",
            "resume_path": "...",
            "status": "ACCEPTED",
            "ats_score": "80.00",
            "created_at": "..."
        }
    ]
}
```

**If the job has no candidates:**

```json
{
    "message": "Candidates fetched successfully",
    "data": []
}
```

An empty array is a valid response and does not indicate an error.

---

### 6. Get Candidate by ID

`GET /api/candidates/:candidateId`

Returns information about a specific candidate.

#### Example Request

`GET /api/candidates/10`

#### Response

**Status:** `200 OK`

**Example:**

```json
{
    "message": "Candidate fetched successfully",
    "data": {
        "id": 10,
        "job_id": 11,
        "name": null,
        "email": null,
        "resume_filename": "resume.pdf",
        "resume_path": "...",
        "status": "ACCEPTED",
        "ats_score": "80.00",
        "created_at": "..."
    }
}
```

#### Candidate Not Found

**Status:** `404 Not Found`

```json
{
    "message": "Candidate not found"
}
```

---

### 7. Get Candidate Fraud Flags

`GET /api/candidates/:candidateId/fraud-flags`

Returns fraud detection evidence associated with a candidate.

#### Example Request

`GET /api/candidates/8/fraud-flags`

#### Response

**Status:** `200 OK`

**Example:**

```json
{
    "message": "Fraud flags fetched successfully",
    "data": [
        {
            "id": 1,
            "candidate_id": 8,
            "type": "WHITE_TEXT",
            "snippet": "Node.js",
            "page_number": 1,
            "font_color": "[255,255,255]",
            "created_at": "..."
        }
    ]
}
```

#### Candidate Without Fraud

For a candidate that has no fraud flags:

```json
{
    "message": "Fraud flags fetched successfully",
    "data": []
}
```

An empty array indicates that no fraud flags are stored for that candidate.

---

## Candidate Statuses

Candidates currently use the following statuses:

| Status | Meaning |
| --- | --- |
| `UPLOADED` | Resume has been uploaded |
| `PROCESSING` | Resume is being processed |
| `ACCEPTED` | Resume passed fraud validation and was scored |
| `REJECTED` | Fraud was detected |
| `FAILED` | Unexpected processing error occurred |

---

## ATS Score

Version 1 uses deterministic requirement matching.

### Default Scoring Weights

| Category | Weight |
| --- | --- |
| Required Skills | 50% |
| Preferred Skills | 20% |
| Languages | 15% |
| Keywords | 15% |
| **Total** | **100%** |

If fraud is detected: **ATS Score = 0**.

---

## API Processing Architecture

```text
Client
   │
   ▼
Express Route
   │
   ▼
Controller
   │
   ▼
Service
   │
   ├── PostgreSQL
   │
   └── Python Processor
```

The Node.js backend is responsible for HTTP requests, database operations, file uploads, and orchestration.

The Python processor is responsible for PDF processing, fraud detection, requirement matching, and ATS scoring.

---

## Current API Limitations

The current Version 1 API does not yet include:

- Authentication
- Authorization
- Pagination
- Filtering
- Sorting
- Search
- Batch resume upload
- Asynchronous queue processing
- Candidate name/email extraction
- Advanced fraud detection
- Semantic resume matching

These are planned for future development.