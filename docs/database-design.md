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

### Requirements

Requirements are stored using PostgreSQL JSONB.

This allows different jobs to define different:

- Required skills
- Preferred skills
- Languages
- Keywords

without changing the database schema.

### Candidates

Represents a candidate applying for a specific job.

Stores:

- Candidate information
- Associated job
- Resume metadata
- Processing status
- ATS score

### Candidate Status

Candidates can have the following processing statuses:

- `UPLOADED`
- `PROCESSING`
- `ACCEPTED`
- `REJECTED`
- `FAILED`

`ACCEPTED` indicates that the resume passed fraud validation and was successfully scored.

`REJECTED` indicates that fraud was detected.

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

## Relationships

```text
Job
 │
 └── Candidates
      │
      ├── Fraud Flags
      │
      └── Processing Metrics
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
