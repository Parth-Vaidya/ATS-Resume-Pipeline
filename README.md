# Automated ATS Resume Shortlisting & Anti-Fraud Pipeline

An automated backend pipeline that evaluates resumes against recruiter-defined job requirements while detecting common ATS manipulation techniques.

## Overview

Recruiters often need to process large numbers of resumes. At the same time, some resumes may contain hidden content designed to influence ATS systems without being visible to a human reviewer.

This project provides a backend pipeline that:

- Accepts one or multiple PDF resumes.
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
              ┌────────────┴────────────┐
              ▼                         ▼
        Fraud Detection            Text Cleaning
              │                         │
              └────────────┬────────────┘
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
- Multiple resume support
- Job creation
- Recruiter-defined requirements
- PostgreSQL persistence
- PDF text extraction
- Hidden white-text detection
- Resume text cleaning
- Requirement normalization
- Deterministic requirement matching
- Deterministic ATS scoring
- Fraud evidence storage

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

The core foundation of the project has been implemented, including:

- Backend and database setup
- Job creation
- Dynamic job requirements
- Resume upload
- PDF parsing
- Fraud detection
- Text cleaning
- Requirement matching
- V1 deterministic scoring

The next major stage is completing the end-to-end integration between the Node.js backend and Python processor.

## Future Development

Possible future improvements include:

- Asynchronous resume processing
- Queue-based batch processing
- Authentication and authorization
- Advanced fraud detection
- Semantic resume matching
- Optional machine-learning-based scoring
- Recruiter dashboard
- Candidate analytics
- Production monitoring

## Project Goal

The goal is to build a modular and scalable resume-processing pipeline that can reliably automate the initial stages of ATS-based candidate screening while keeping fraud detection and scoring transparent.

## Author

Parth Vaidya