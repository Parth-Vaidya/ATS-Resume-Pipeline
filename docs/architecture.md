# System Architecture

## Overview

The ATS Resume Shortlisting & Anti-Fraud Pipeline is a backend system that processes resumes, detects ATS manipulation techniques, matches resumes against recruiter-defined requirements, and calculates a deterministic ATS score.

Version 1 uses a Node.js backend with a Python processing layer and PostgreSQL database.

## Architecture

Client
  |
  v
Node.js + Express
  |
  +---- PostgreSQL
  |
  +---- Resume Storage
  |
  v
Python Processor
  |
  +---- PDF Parser
  +---- Fraud Detector
  +---- Text Cleaner
  +---- Requirement Matcher
  +---- ATS Scorer
  |
  v
Node.js
  |
  v
Client

## Components

### Node.js Backend

Responsible for:

- REST API
- Job creation
- Resume upload
- File validation
- Candidate creation
- Candidate status management
- Database communication
- Calling the Python processor

### Python Processor

Responsible for:

- PDF text extraction
- White-text fraud detection
- Text cleaning
- Requirement matching
- ATS score calculation

### PostgreSQL

Stores:

- Jobs
- Recruiter-defined requirements
- Candidates
- ATS scores
- Fraud detection results
- Processing metrics

### Storage

Uploaded PDF resumes are temporarily stored in the `storage/` directory.

The directory is ignored by Git.

## Version 1 Design

The scoring system is deterministic and requirement-based.

Future versions may introduce semantic similarity or ML-based ranking.