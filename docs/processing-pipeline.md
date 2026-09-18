# Resume Processing Pipeline

The resume processing pipeline takes an uploaded PDF and converts it into a structured ATS evaluation.

## Processing Flow

```text
Resume Upload
      ↓
File Validation
      ↓
PDF Parsing
      ↓
Fraud Detection
      ↓
Text Cleaning
      ↓
Requirement Matching
      ↓
ATS Scoring
      ↓
Store Result
1. Resume Upload

The Node.js backend receives one or multiple PDF resumes.

Each uploaded resume is associated with a specific job and candidate record.

2. File Validation

The system verifies that the uploaded file meets the basic requirements, such as:

PDF format
Allowed file size
Valid upload

Invalid files are rejected before processing.

3. PDF Parsing

The Python processor extracts text and document information from the resume.

The parser also preserves information required for detecting suspicious formatting.

4. Fraud Detection

The extracted PDF structure is inspected for potential ATS manipulation.

For V1, the primary detection mechanism is hidden or near-white text.

If suspicious content is detected, processing stops for that candidate.

5. Text Cleaning

Valid resume text is normalized to make matching more consistent.

This includes:

Normalizing whitespace
Removing unnecessary formatting differences
Normalizing text case
Cleaning excessive blank lines
6. Requirement Matching

The cleaned resume is compared with the requirements defined by the recruiter for the job.

Requirements can include:

Required skills
Preferred skills
Programming languages
Keywords
Minimum experience
7. ATS Scoring

The system calculates a deterministic ATS score based on the candidate's matched requirements.

The score is generated only after the resume passes fraud validation.

8. Result Storage

The final processing result is stored in PostgreSQL.

The system records information such as:

Candidate status
Matched requirements
Missing requirements
ATS score
Fraud information, if detected
Processing information
Candidate Outcomes

A resume can result in:

ACCEPTED — passed validation and was successfully evaluated.
REJECTED — failed fraud or compliance validation.
FAILED — processing encountered an unexpected error.
V1 Principle

Version 1 focuses on a simple, deterministic pipeline.

No machine-learning model is required for the current processing flow.