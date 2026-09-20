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

The next development stage is building frontend-ready read APIs for jobs, candidates and fraud results.

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

## Project Goal

The goal is to build a modular and scalable resume-processing pipeline that can reliably automate the initial stages of ATS-based candidate screening while keeping fraud detection and scoring transparent.

## Author

Parth Vaidya