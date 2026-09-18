# System Architecture

The ATS Resume Shortlisting & Anti-Fraud Pipeline is designed as a modular backend system where each component has a specific responsibility.

## High-Level Architecture

The system consists of three main components:

- **Node.js Backend** — handles API requests, file uploads, business logic and system orchestration.
- **PostgreSQL Database** — stores jobs, candidates, requirements, fraud results and processing information.
- **Python Processor** — handles resume parsing, fraud detection, text cleaning, requirement matching and ATS scoring.

### Flow

Client → Node.js API → Python Processor → PostgreSQL → Node.js API → Client

## Component Responsibilities

### Node.js Backend

Node.js acts as the main backend of the application.

It is responsible for:

- Receiving job information and recruiter-defined requirements.
- Accepting resume uploads.
- Managing candidates and jobs.
- Communicating with the Python processor.
- Managing processing status.
- Returning results to the client.

### Python Processor

Python is dedicated to resume analysis.

It handles the processing stages:

1. PDF text extraction
2. Fraud detection
3. Text cleaning
4. Requirement matching
5. ATS scoring

Keeping these operations separate from the main API makes the system easier to maintain and extend.

### PostgreSQL

PostgreSQL acts as the persistent data layer.

It stores:

- Job information
- Recruiter-defined requirements
- Candidate information
- Resume metadata
- Fraud detection results
- ATS scores
- Processing metrics

## Processing Separation

The project follows a separation-of-responsibility approach:

**Node.js**
→ API and orchestration

**Python**
→ Resume processing and analysis

**PostgreSQL**
→ Persistent storage

This allows each component to evolve independently.

## V1 Architecture

Version 1 intentionally uses deterministic processing without machine-learning models.

The current scoring system is based on recruiter-defined requirements and direct requirement matching.

Machine-learning-based semantic analysis may be introduced in a future version if required.