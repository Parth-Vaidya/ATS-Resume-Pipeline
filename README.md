# Automated ATS Resume Shortlisting & Anti-Fraud Pipeline

An automated backend pipeline that evaluates resumes against recruiter-defined job requirements while detecting common ATS manipulation techniques.

## Overview

Recruiters often need to process large numbers of resumes. At the same time, some resumes may contain hidden content designed to influence ATS systems without being visible to a human reviewer.

This project provides a backend pipeline that:

- Accepts one PDF resume per request.
- Batch resume processing is planned for a future version.
- Associates resumes with a specific job.
- Detects hidden or suspicious text used for ATS manipulation.
- Rejects resumes that fail fraud validation.
- Matches valid resumes against recruiter-defined requirements.
- Generates a deterministic ATS score.
- Stores processing results for later review.

## How It Works

```text
                    Job + Requirements
                            │
                            ▼
                       Node.js API
                            │
                      Resume Upload
                            │
                            ▼
                     Python Processor
                            │
              ┌─────────────┴─────────────┐
              ▼                           ▼
       Fraud Detection               Text Cleaning
              │                           │
              └─────────────┬─────────────┘
                            ▼
                   Requirement Matching
                            │
                            ▼
                       ATS Scoring
                            │
                            ▼
                       PostgreSQL
                            │
                            ▼
                         Results
```

## Architecture

The project follows a modular architecture:

- **Node.js + Express** — API layer and system orchestration
- **Python** — resume processing and analysis
- **PostgreSQL** — persistent data storage
- **PyMuPDF** — PDF parsing and text extraction

Node.js manages the application workflow while Python handles resume-specific processing.

## V1 Features

- PDF resume upload
- Single-resume processing
- Job creation
- Recruiter-defined requirements
- Custom scoring configuration
- PostgreSQL persistence
- PDF text extraction
- Hidden white-text detection
- Resume text cleaning
- Requirement normalization
- Deterministic requirement matching
- Deterministic ATS scoring
- Fraud evidence storage
- Candidate status management
- Node.js ↔ Python processing integration

Version 1 intentionally does not use machine-learning models.

## Documentation

Detailed information about individual parts of the system is available in the `docs/` directory.

- [System Architecture](docs/architecture.md)
- [Resume Processing Pipeline](docs/processing-pipeline.md)
- [Fraud Detection](docs/fraud-detection.md)
- [Requirement Matching](docs/requirement-matching.md)
- [ATS Scoring](docs/ats-scoring.md)
- [Database Design](docs/database-design.md)
- [Development Progress](docs/development-progress.md)

## Project Structure

```text
ats-resume-pipeline/
│
├── backend/          # Node.js API
├── processor/        # Python resume processing
├── database/         # Database structure
├── storage/          # Uploaded resumes
├── docs/             # Project documentation
│
├── README.md
└── .gitignore
```

## Current Status

The core Version 1 resume-processing pipeline is complete and functional.

Implemented:

- Backend and database setup
- Job creation
- Dynamic recruiter-defined requirements
- Dynamic scoring configuration
- Resume upload
- PDF parsing
- Fraud detection
- Text cleaning
- Requirement matching
- Deterministic ATS scoring
- Candidate processing
- Node.js ↔ Python integration
- PostgreSQL persistence
- Postman testing workflow
- Frontend-ready candidate and job APIs

## Future Development

Possible future improvements include:

- Pagination and filtering
- Authentication and authorization
- Advanced fraud detection
- Batch resume processing
- Asynchronous processing
- Queue-based processing
- Semantic resume matching
- Optional machine-learning-based scoring
- Recruiter dashboard
- Candidate analytics
- Production monitoring
- Docker deployment

# Setup & Installation Guide

This section describes how to set up, configure, and run the **ATS Resume Shortlisting & Anti-Fraud Pipeline** locally across Node.js, PostgreSQL, and Python environments.

---

## Getting Started

Follow the steps below to clone and run the project locally.

### Prerequisites

Make sure the following are installed on your system:

- **Git**
- **Node.js**
- **npm**
- **Python 3.12+**
- **PostgreSQL**
- **pgAdmin** (optional, but recommended)

You can verify your installations:

```bash
git --version
node --version
npm --version
python --version
psql --version
```

---

### 1. Clone the Repository

```bash
git clone [https://github.com/Parth-Vaidya/ATS-Resume-Pipeline.git](https://github.com/Parth-Vaidya/ATS-Resume-Pipeline.git)
cd ATS-Resume-Pipeline
```

---

### 2. Set Up PostgreSQL

Create a PostgreSQL database named `ats_resume_pipeline`.

Using `psql`:

```bash
psql -U postgres
```

Then run:

```sql
CREATE DATABASE ats_resume_pipeline;
```

Connect to the database:

```sql
\c ats_resume_pipeline
```

Run the database schema:

```bash
psql -U postgres -d ats_resume_pipeline -f database/schema.sql
```

---

### 3. Configure Backend Environment Variables

Go to the `backend/` directory:

```bash
cd backend
```

Create a `.env` file:

```env
DB_USER=postgres
DB_HOST=localhost
DB_NAME=ats_resume_pipeline
DB_PASSWORD=YOUR_POSTGRES_PASSWORD
DB_PORT=5432
```

> **Note:** Replace `YOUR_POSTGRES_PASSWORD` with your actual PostgreSQL password. Never commit the `.env` file to GitHub.

---

### 4. Install Backend Dependencies

Inside the `backend/` directory, run:

```bash
npm install
```

This installs the Node.js dependencies defined in `package.json`.

---

### 5. Set Up the Python Processor

Go back to the project root:

```bash
cd ..
```

Create a Python virtual environment:

```bash
python -m venv processor/.venv
```

Activate the virtual environment:

- **Windows:**
  ```powershell
  processor\.venv\Scripts\activate
  ```
- **Linux / macOS:**
  ```bash
  source processor/.venv/bin/activate
  ```

Install Python dependencies:

```bash
pip install -r processor/requirements.txt
```

> **Note:** The Python processor currently uses `PyMuPDF` for PDF parsing and fraud detection.

---

### 6. Start the Backend

Open a terminal and navigate to:

```bash
cd backend
npm run dev
```

The backend should start at `http://localhost:5000`.

You should see:

```text
Server is running on http://localhost:5000
Database connection successful
```

---

### 7. Verify the API

You can test the backend using Postman, Insomnia, or cURL.

#### Get All Jobs

`GET http://localhost:5000/api/jobs`

#### Create a Job

`POST http://localhost:5000/api/jobs`

**Request Body (`application/json`):**

```json
{
    "job_title": "Backend Developer",
    "job_description": "Looking for a backend developer with Node.js and PostgreSQL experience.",
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
            "backend"
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

---

### 8. Process a Resume

After creating a job, upload a PDF resume:

`POST http://localhost:5000/api/jobs/:jobId/resume`

Use `multipart/form-data` with:

- `file`: `<resume.pdf>`

The backend execution flow:

1. Stores the resume in `storage/`.
2. Creates a candidate record.
3. Invokes the Python processor.
4. Extracts PDF text.
5. Checks for white-text fraud.
6. Cleans the extracted text.
7. Matches the resume against job requirements.
8. Calculates the ATS score.
9. Stores the result in PostgreSQL.
10. Returns the processing result.

---

## Project Startup Summary

For routine local development, run:

### Terminal 1 — Backend API
```bash
cd ATS-Resume-Pipeline/backend
npm run dev
```

### Terminal 2 — Python Environment (Optional)
If you need to work directly on the Python processor:

- **Windows:**
  ```powershell
  processor\.venv\Scripts\activate
  ```
- **Linux / macOS:**
  ```bash
  source processor/.venv/bin/activate
  ```

> The Node.js backend automatically invokes the Python processor during resume processing.

---

## Important Notes

- `storage/` is used for storing uploaded resumes.
- `node_modules/`, `processor/.venv/`, and `.env` should **not** be committed to Git.
- PostgreSQL must be running before starting the backend.
- The current V1 processes one resume per request. Batch processing and asynchronous job queues are planned for future versions.

---

## Cross-Platform Virtual Environment Resolution

> **Cleanup Task Note:**  
> Currently, `processing.service.js` resolves the Python virtual environment binary as:
> ```text
> processor/.venv/Scripts/python.exe
> ```
> This path is Windows-specific. For broader OS support, a small cleanup task is planned to dynamically detect `process.platform` and resolve either `Scripts/python.exe` (Windows) or `bin/python` (Linux/macOS).

## Project Goal

The goal is to build a modular and scalable resume-processing pipeline that can reliably automate the initial stages of ATS-based candidate screening while keeping fraud detection and scoring transparent.

## Author

Parth Vaidya