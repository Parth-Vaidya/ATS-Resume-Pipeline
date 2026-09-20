# Database Design

PostgreSQL is used as the persistent data layer of the ATS pipeline.

The database stores jobs, recruiter requirements, candidates, fraud results, and processing information.

## Main Entities

### Jobs

Represents a job created by a recruiter.

Stores:

- Job ID
- Job title
- Job description
- Recruiter-defined requirements
- Scoring configuration
- Processing status
- Creation timestamp
- Completion timestamp

### Requirements and Scoring Configuration

The `jobs` table contains two JSONB fields:

- `requirements`
- `scoring_config`

`requirements` stores recruiter-defined requirements for the job.

`scoring_config` stores the weighting used by the ATS scoring system.

This allows different jobs to have different requirements and scoring strategies without changing the database schema.

### Candidates

Represents a candidate applying for a specific job.

Stores:

- Candidate information
- Associated job
- Resume metadata
- Processing status
- ATS score

### Candidate Statuses

Candidates currently use the following statuses:

- `UPLOADED`
- `PROCESSING`
- `ACCEPTED`
- `REJECTED`
- `FAILED`

`ACCEPTED` means the resume passed fraud validation and was successfully scored.

`REJECTED` means fraud was detected.

`FAILED` indicates an unexpected processing error.

### Fraud Flags

Stores evidence of detected ATS manipulation.

Each fraud record is associated with a candidate and can contain:

- Fraud type
- Detected text
- Page number
- Font information

## Current Processing Relationship

A job can have multiple candidates.

Each candidate represents one uploaded resume for that job.

A candidate can have multiple fraud flags.

Processing metrics are associated with the candidate and are intended for future performance monitoring.

### Processing Metrics

Stores information about the processing time for different stages of resume analysis.

This can later be used to monitor performance and identify processing bottlenecks.

## Current Relationships

```text
jobs
  |
  | 1:N
  v
candidates
  |
  | 1:N
  v
fraud_flags

candidates
  |
  | 1:1
  v
processing_metrics
```

A job can have multiple candidates.

A candidate can have multiple fraud flags and processing records.

## Data Design Principles

The database is designed to:

- Keep job and candidate data separated.
- Associate every candidate with a specific job.
- Preserve fraud evidence for review.
- Store dynamic job requirements.
- Support future processing and performance analysis.
