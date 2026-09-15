Yes — the previous version was more of a **summary README**. For a serious GitHub project, we can make it much more complete: explain the problem, architecture, database, API flow, fraud detection logic, scoring methodology, setup, development phases, status codes, environment variables, testing, security, and roadmap.

Copy **the entire block below** into `README.md`:

````markdown
# Automated ATS Resume Shortlisting & Anti-Fraud Pipeline

> An automated backend system for parsing, validating, detecting ATS manipulation, and ranking candidate resumes against a target Job Description.

---

## 📌 Overview

The **Automated ATS Resume Shortlisting & Anti-Fraud Pipeline** is a backend-focused system designed to automate the initial screening of candidate resumes.

Modern Applicant Tracking Systems (ATS) are often used to filter resumes based on keywords and similarity to a Job Description. This creates an opportunity for candidates to manipulate ATS systems by adding hidden keywords, white text, extremely small text, or other techniques that are invisible to human recruiters but detectable by automated systems.

This project addresses that problem by building a processing pipeline that:

1. Accepts a Job Description.
2. Accepts one or multiple candidate resumes.
3. Stores the uploaded resumes securely.
4. Extracts structured information from PDF files.
5. Detects suspicious ATS manipulation techniques.
6. Rejects fraudulent/non-compliant resumes.
7. Cleans valid resume text.
8. Compares the resume against the target Job Description.
9. Calculates an ATS compatibility score.
10. Stores the processing results.
11. Allows recruiters to retrieve and rank candidates.

The project is being developed with a **production-oriented backend architecture** rather than as a simple monolithic script.

---

# 🎯 Problem Statement

Recruiters may receive hundreds or thousands of resumes for a single job opening.

Manually reviewing every resume is:

- Time consuming
- Expensive
- Difficult to scale
- Inconsistent

ATS systems help automate this process, but candidates can attempt to manipulate ATS ranking systems using techniques such as:

- Hidden white text
- Keyword stuffing
- Extremely small fonts
- Text positioned outside visible areas
- Repeated keywords
- Other PDF-level manipulation techniques

Therefore, a reliable screening system should perform two major tasks:

```text
Resume
   |
   +----> Fraud / Manipulation Detection
   |
   +----> Resume-JD Compatibility Analysis
````

This project combines both processes into a single backend pipeline.

---

# 🎯 Project Objectives

The main objectives are:

* Build a scalable backend architecture.
* Provide REST APIs for job and resume management.
* Store job and candidate data in PostgreSQL.
* Process PDF resumes using Python.
* Detect hidden ATS manipulation.
* Separate fraud detection from ATS scoring.
* Calculate resume-to-JD similarity.
* Support batch resume processing.
* Track processing performance.
* Design the system for future asynchronous processing.
* Follow production backend engineering practices.

---

# 🏗️ High-Level Architecture

```text
                         ┌───────────────────┐
                         │      Client       │
                         │   React/Postman   │
                         └─────────┬─────────┘
                                   │
                                   │ HTTP
                                   ▼
                         ┌───────────────────┐
                         │   Node.js API     │
                         │     Express       │
                         └─────────┬─────────┘
                                   │
                  ┌────────────────┼────────────────┐
                  │                │                │
                  ▼                ▼                ▼
           ┌────────────┐   ┌─────────────┐   ┌────────────┐
           │  Storage   │   │ PostgreSQL  │   │   Queue    │
           │   PDFs     │   │  Database   │   │ Redis/Bull │
           └────────────┘   └─────────────┘   └─────┬──────┘
                                                    │
                                                    ▼
                                           ┌─────────────────┐
                                           │ Python Processor│
                                           └────────┬────────┘
                                                    │
                         ┌──────────────────────────┼─────────────────────────┐
                         │                          │                         │
                         ▼                          ▼                         ▼
                  ┌────────────┐             ┌────────────┐            ┌────────────┐
                  │ PDF Parser │             │   Fraud    │            │   Text     │
                  │            │             │  Detector  │            │  Cleaner   │
                  └────────────┘             └────────────┘            └─────┬──────┘
                                                                              │
                                                                              ▼
                                                                      ┌──────────────┐
                                                                      │ ATS Scoring  │
                                                                      │ TF-IDF + NLP │
                                                                      └──────┬───────┘
                                                                             │
                                                                             ▼
                                                                      ┌──────────────┐
                                                                      │ PostgreSQL   │
                                                                      └──────────────┘
```

---

# 🧩 Architecture Philosophy

The system intentionally separates responsibilities between Node.js and Python.

## Node.js

Node.js is responsible for:

* HTTP APIs
* Request validation
* File upload handling
* Authentication
* Authorization
* Database operations
* Business logic
* Job management
* Queue management
* Communication with the Python processor

## Python

Python is responsible for:

* PDF parsing
* PDF layout analysis
* Text extraction
* Fraud detection
* Text cleaning
* NLP processing
* Machine learning
* ATS scoring

### Why this separation?

Python provides a much stronger ecosystem for:

* NLP
* Machine learning
* PDF processing
* Text embeddings
* Scientific computing

Node.js provides an excellent ecosystem for:

* REST APIs
* Web applications
* Authentication
* Database-backed services
* Asynchronous server-side applications

Therefore:

```text
Node.js = Backend / Orchestrator

Python = Processing / ML Engine
```

---

# 🛠️ Technology Stack

## Backend

| Technology | Purpose                   |
| ---------- | ------------------------- |
| Node.js    | Backend runtime           |
| Express.js | REST API framework        |
| PostgreSQL | Relational database       |
| Multer     | Multipart file uploads    |
| dotenv     | Environment configuration |

## Processing

| Technology            | Purpose               |
| --------------------- | --------------------- |
| Python                | Processing engine     |
| PyMuPDF               | PDF parsing           |
| scikit-learn          | TF-IDF and similarity |
| sentence-transformers | Semantic embeddings   |

## Infrastructure

| Technology | Purpose                   |
| ---------- | ------------------------- |
| Redis      | Queue/cache               |
| BullMQ     | Background job processing |
| Docker     | Containerization          |
| S3         | Future cloud file storage |

## Development

| Tool    | Purpose               |
| ------- | --------------------- |
| Git     | Version control       |
| GitHub  | Source control        |
| Postman | API testing           |
| pgAdmin | PostgreSQL management |

---

# 📁 Project Structure

```text
ats-resume-pipeline/
│
├── backend/
│   │
│   ├── src/
│   │   │
│   │   ├── config/
│   │   │   ├── database.js
│   │   │   └── env.js
│   │   │
│   │   ├── controllers/
│   │   │   ├── job.controller.js
│   │   │   ├── resume.controller.js
│   │   │   └── candidate.controller.js
│   │   │
│   │   ├── routes/
│   │   │   ├── job.routes.js
│   │   │   ├── resume.routes.js
│   │   │   └── candidate.routes.js
│   │   │
│   │   ├── middleware/
│   │   │   ├── upload.middleware.js
│   │   │   ├── job.validation.js
│   │   │   ├── error.middleware.js
│   │   │   └── auth.middleware.js
│   │   │
│   │   ├── services/
│   │   │   ├── job.service.js
│   │   │   ├── candidate.service.js
│   │   │   ├── resume.service.js
│   │   │   └── processing.service.js
│   │   │
│   │   ├── queues/
│   │   │   └── resume.queue.js
│   │   │
│   │   ├── app.js
│   │   └── server.js
│   │
│   ├── package.json
│   ├── package-lock.json
│   └── .env
│
├── processor/
│   │
│   ├── app/
│   │   ├── main.py
│   │   ├── parser.py
│   │   ├── validator.py
│   │   ├── cleaner.py
│   │   └── scorer.py
│   │
│   ├── requirements.txt
│   └── Dockerfile
│
├── database/
│   ├── migrations/
│   └── schema.sql
│
├── storage/
│
├── docker-compose.yml
├── .gitignore
└── README.md
```

---

# 🔄 Complete Processing Pipeline

The final system will follow this flow:

```text
                         Job Description
                               |
                               ▼
                        Create Job Record
                               |
                               ▼
                        Upload Resumes
                               |
                               ▼
                         File Validation
                               |
                               ▼
                        Store PDF Files
                               |
                               ▼
                     Create Candidate Records
                               |
                               ▼
                      Processing Job Created
                               |
                               ▼
                        Python Processor
                               |
                               ▼
                         PDF Extraction
                               |
                               ▼
                       Fraud Detection
                         /           \
                        /             \
                 Fraud Found       Clean Resume
                     |                  |
                     ▼                  ▼
                 REJECTED          Text Cleaning
                 Score = 0              |
                                        ▼
                                  ATS Scoring
                                        |
                                        ▼
                                Store Final Result
                                        |
                                        ▼
                               Candidate Ranking
```

---

# 📄 Resume Upload Flow

When a recruiter uploads a resume:

```text
Client
  |
  | multipart/form-data
  ▼
POST /api/jobs/:jobId/resumes
  |
  ▼
Multer
  |
  +---- Validate extension
  |
  +---- Validate file size
  |
  ▼
Storage
  |
  ▼
Create Candidate Record
  |
  ▼
Status = UPLOADED
```

The initial implementation stores files locally.

Future versions will use cloud object storage such as Amazon S3.

---

# 🗄️ Database Design

The project uses PostgreSQL as the primary relational database.

---

## Jobs Table

Stores Job Descriptions submitted by recruiters.

```sql
CREATE TABLE jobs (
    id SERIAL PRIMARY KEY,
    job_title VARCHAR(255) NOT NULL,
    job_description TEXT NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'CREATED',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    completed_at TIMESTAMP
);
```

### Fields

| Field           | Description           |
| --------------- | --------------------- |
| id              | Unique job identifier |
| job_title       | Name of the position  |
| job_description | Target JD             |
| status          | Job processing status |
| created_at      | Creation timestamp    |
| completed_at    | Completion timestamp  |

---

# 👤 Candidates Table

Stores information about candidates and their uploaded resumes.

```sql
CREATE TABLE candidates (
    id SERIAL PRIMARY KEY,
    job_id INTEGER NOT NULL REFERENCES jobs(id) ON DELETE CASCADE,
    name VARCHAR(255),
    email VARCHAR(255),
    resume_filename VARCHAR(255) NOT NULL,
    resume_path TEXT NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'UPLOADED',
    ats_score DECIMAL(5,2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Fields

| Field           | Description                   |
| --------------- | ----------------------------- |
| id              | Unique candidate identifier   |
| job_id          | Job associated with candidate |
| name            | Candidate name                |
| email           | Candidate email               |
| resume_filename | Original resume filename      |
| resume_path     | Stored file location          |
| status          | Candidate processing status   |
| ats_score       | Final ATS score               |
| created_at      | Upload timestamp              |

---

# 🚨 Fraud Flags Table

Stores evidence of ATS manipulation.

```sql
CREATE TABLE fraud_flags (
    id SERIAL PRIMARY KEY,
    candidate_id INTEGER NOT NULL REFERENCES candidates(id) ON DELETE CASCADE,
    type VARCHAR(100) NOT NULL,
    snippet TEXT,
    page_number INTEGER,
    font_color VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Fields

| Field        | Description                     |
| ------------ | ------------------------------- |
| id           | Fraud record ID                 |
| candidate_id | Candidate associated with fraud |
| type         | Fraud type                      |
| snippet      | Detected suspicious text        |
| page_number  | PDF page                        |
| font_color   | Detected text color             |
| created_at   | Detection timestamp             |

---

# ⏱️ Processing Metrics Table

Tracks processing performance.

```sql
CREATE TABLE processing_metrics (
    id SERIAL PRIMARY KEY,
    candidate_id INTEGER NOT NULL REFERENCES candidates(id) ON DELETE CASCADE,
    parse_time_ms INTEGER,
    fraud_check_time_ms INTEGER,
    scoring_time_ms INTEGER,
    total_time_ms INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

This will allow us to measure:

```text
PDF Parsing Time
       +
Fraud Detection Time
       +
ATS Scoring Time
       =
Total Processing Time
```

---

# 🔗 Database Relationships

```text
Users
  |
  | 1:N
  ▼
Jobs
  |
  | 1:N
  ▼
Candidates
  |
  +-------- 1:N --------> Fraud Flags
  |
  +-------- 1:N --------> Processing Metrics
```

User authentication is planned for a future phase.

---

# 📊 Candidate Status Lifecycle

A candidate moves through several states.

```text
UPLOADED
    |
    ▼
PROCESSING
    |
    +--------------------+
    |                    |
    ▼                    ▼
ACCEPTED              REJECTED
    |
    |
    ▼
  Scored
```

If an unexpected processing error occurs:

```text
PROCESSING
    |
    ▼
FAILED
```

---

# 📌 Candidate Statuses

| Status       | Meaning                               |
| ------------ | ------------------------------------- |
| `UPLOADED`   | Resume uploaded successfully          |
| `PROCESSING` | Resume is currently being processed   |
| `ACCEPTED`   | Resume passed validation and scoring  |
| `REJECTED`   | Resume failed fraud/compliance checks |
| `FAILED`     | Unexpected processing failure         |

---

# 🚫 Rejection Reasons

The system may reject resumes because of:

```text
WHITE_TEXT_DETECTED
INVALID_PDF
CORRUPTED_FILE
PROCESSING_ERROR
```

Additional fraud detection techniques will be added later.

---

# 🛡️ ATS Fraud Detection

## Initial Detection: Hidden White Text

The first version detects text whose font color is white or near-white.

Example:

```text
Visible Text:

Backend Developer
JavaScript
Node.js
PostgreSQL
Express.js
```

Hidden text:

```text
Python
AWS
Kubernetes
Django
Machine Learning
```

The hidden keywords may be used to manipulate ATS keyword matching.

---

# 🔍 PDF Metadata Inspection

PyMuPDF exposes span-level metadata.

Conceptually:

```python
import fitz

doc = fitz.open(pdf_path)

for page in doc:
    blocks = page.get_text("dict")["blocks"]

    for block in blocks:
        for line in block.get("lines", []):
            for span in line.get("spans", []):
                text = span["text"]
                color = span["color"]
```

The processor will inspect:

* Text
* Font
* Font size
* Font color
* Bounding box
* Page number

---

# 🚨 Fraud Detection Result

If suspicious white text is found:

```json
{
  "status": "REJECTED",
  "atsScore": 0,
  "fraudFlags": [
    {
      "type": "WHITE_TEXT",
      "page": 2,
      "snippet": "Python Django Kubernetes AWS",
      "fontColor": "FFFFFF"
    }
  ]
}
```

Processing stops before ATS scoring.

This prevents manipulated resumes from receiving a meaningful ATS score.

---

# 🧹 Text Cleaning

Valid resumes are passed to the text cleaning stage.

The cleaner will perform tasks such as:

* Normalize whitespace
* Remove unnecessary characters
* Normalize text casing where appropriate
* Remove extraction noise
* Preserve important resume information

Example:

```text
Raw PDF Text
      |
      ▼
Whitespace Normalization
      |
      ▼
Noise Removal
      |
      ▼
Clean Resume Text
```

---

# 🤖 ATS Scoring

The ATS scoring system uses two complementary approaches.

---

## 1. Lexical Similarity

TF-IDF is used to determine the importance of terms in:

* Job Description
* Resume

The vectors are compared using cosine similarity.

```text
Resume
   |
   ▼
TF-IDF Vector
   |
   |
   | Cosine Similarity
   |
   ▼
Job Description
```

---

# 2. Semantic Similarity

Keyword matching alone can fail when two texts use different words with similar meanings.

For example:

```text
Resume:
"Developed RESTful backend services"

Job Description:
"Experience building server-side APIs"
```

These statements are semantically related even though the keywords differ.

Sentence Transformers can convert text into embeddings:

```text
Resume
   |
   ▼
Embedding Vector
   |
   | Cosine Similarity
   |
   ▼
JD Embedding
```

---

# 🧮 Final ATS Score

The planned scoring formula is:

```text
Final Score =
    (Lexical Score × 0.40)
    +
    (Semantic Score × 0.60)
```

The result is converted into a score from:

```text
0 - 100
```

Example:

```text
Lexical Score  = 72
Semantic Score = 91

Final Score =
(72 × 0.40) + (91 × 0.60)

= 28.8 + 54.6

= 83.4
```

Final ATS Score:

```text
83.40 / 100
```

The weights will be configurable and may be adjusted after testing.

---

# 📊 Example Candidate Results

## Accepted Candidate

```json
{
  "candidateId": 124,
  "status": "ACCEPTED",
  "atsScore": 87.42,
  "fraudFlags": []
}
```

---

## Rejected Candidate

```json
{
  "candidateId": 125,
  "status": "REJECTED",
  "atsScore": 0,
  "fraudFlags": [
    {
      "type": "WHITE_TEXT",
      "page": 2,
      "snippet": "Python Django Kubernetes AWS"
    }
  ]
}
```

---

# 📡 REST API

## Jobs

### Create Job

```http
POST /api/jobs
```

Request:

```json
{
  "job_title": "Backend Developer",
  "job_description": "Node.js, Express.js, PostgreSQL, REST APIs and Docker"
}
```

Response:

```json
{
  "message": "Job created successfully",
  "data": {
    "id": 1,
    "job_title": "Backend Developer",
    "job_description": "Node.js, Express.js, PostgreSQL, REST APIs and Docker",
    "status": "CREATED"
  }
}
```

---

## Get Job

```http
GET /api/jobs/:jobId
```

Returns job information and processing status.

---

# 📄 Resume APIs

## Upload Resumes

```http
POST /api/jobs/:jobId/resumes
```

Content type:

```text
multipart/form-data
```

Field:

```text
files
```

Example:

```text
files → resume1.pdf
files → resume2.pdf
files → resume3.pdf
```

Maximum number of files in the current implementation:

```text
10
```

Maximum file size:

```text
5 MB per file
```

---

# 👤 Candidate APIs

## Get Candidate

```http
GET /api/candidates/:candidateId
```

Returns:

* Candidate information
* Resume information
* Processing status
* ATS score
* Fraud flags

---

## Get Candidates for a Job

```http
GET /api/jobs/:jobId/candidates
```

Future query parameters:

```http
GET /api/jobs/1/candidates?sort=score
```

Possible sorting:

```text
score
created_at
name
status
```

---

# 🧱 Backend Layer Architecture

The Node.js backend follows a layered architecture.

```text
Route
  |
  ▼
Controller
  |
  ▼
Service
  |
  ▼
Database
```

---

## Routes

Routes define API endpoints.

Example:

```javascript
router.post(
    "/",
    validateCreateJob,
    createJob
);
```

Routes should remain thin.

---

## Controllers

Controllers handle HTTP-level responsibilities:

* Read request
* Validate request result
* Call services
* Select HTTP status
* Send response

Example:

```text
HTTP Request
     |
     ▼
Controller
     |
     ▼
Service
```

---

## Services

Services contain application/business logic.

Example:

```text
createJob()
    |
    ▼
Build database query
    |
    ▼
Execute PostgreSQL query
    |
    ▼
Return database result
```

---

## Middleware

Middleware is responsible for cross-cutting concerns:

* Validation
* Authentication
* File uploads
* Error handling
* Authorization

---

# 🐍 Python Processor Architecture

The Python processor is divided into independent responsibilities.

```text
main.py
   |
   +---- parser.py
   |
   +---- validator.py
   |
   +---- cleaner.py
   |
   +---- scorer.py
```

---

## `parser.py`

Responsible for:

* Opening PDFs
* Extracting text
* Extracting PDF layout metadata
* Extracting font information

---

## `validator.py`

Responsible for:

* Fraud detection
* White-text detection
* Future manipulation checks

---

## `cleaner.py`

Responsible for:

* Cleaning extracted text
* Normalizing content
* Preparing text for scoring

---

## `scorer.py`

Responsible for:

* TF-IDF
* Cosine similarity
* Embeddings
* Semantic similarity
* Final ATS score

---

## `main.py`

Acts as the processor entry point.

It coordinates:

```text
Parser
  ↓
Validator
  ↓
Cleaner
  ↓
Scorer
  ↓
Result
```

---

# 🔄 Node.js ↔ Python Communication

Initially, Node.js and Python may communicate through an internal HTTP interface.

```text
Node.js
   |
   | Resume path + Job Description
   ▼
Python Processor
   |
   | Processing
   ▼
JSON Result
   |
   ▼
Node.js
   |
   ▼
PostgreSQL
```

Future versions will use a queue:

```text
Node.js
   |
   ▼
Redis / BullMQ
   |
   ▼
Python Worker
   |
   ▼
PostgreSQL
```

---

# ⚡ Asynchronous Processing

Resume processing can be computationally expensive.

Therefore, the production architecture should not keep the HTTP request open while processing every resume.

Instead:

```text
POST /api/jobs/1/resumes
          |
          ▼
       202 Accepted
          |
          ▼
       job_id
          |
          ▼
    Background Worker
          |
          ▼
      Processing
```

The client can then query:

```http
GET /api/jobs/:jobId
```

or:

```http
GET /api/candidates/:candidateId
```

---

# 🧪 Testing Strategy

The project will eventually include multiple testing levels.

## Unit Tests

Test individual functions:

```text
Validator
Cleaner
Scorer
Services
Utilities
```

---

## Integration Tests

Test:

```text
API
 +
Database
 +
Processing Service
```

---

## API Testing

Postman will be used during development.

Important test cases include:

### Job Creation

* Valid Job Description
* Missing title
* Missing description
* Empty title
* Empty description

### Resume Upload

* Valid PDF
* Non-PDF file
* Oversized PDF
* Multiple PDFs
* No file
* Invalid job ID

### Fraud Detection

* Normal PDF
* White-text PDF
* Multiple suspicious spans
* Multi-page PDF

---

# 🔐 Security

Security is an important part of the production version.

Planned protections include:

## Authentication

JWT-based authentication.

```text
User
 |
 ▼
Login
 |
 ▼
JWT
 |
 ▼
Protected API
```

---

## Authorization

Users should only access their own:

* Jobs
* Candidates
* Resumes
* Processing results

---

## File Security

Uploaded files should be:

* Validated
* Size limited
* Stored outside public web directories
* Given safe generated filenames
* Checked for malicious content

---

## Input Validation

All API inputs should be validated before reaching business logic.

---

## SQL Injection Protection

Parameterized PostgreSQL queries will be used.

Example:

```javascript
const query = `
    INSERT INTO jobs (job_title, job_description)
    VALUES ($1, $2)
`;

const values = [
    jobTitle,
    jobDescription
];

await pool.query(query, values);
```

---

## Environment Variables

Sensitive information must never be committed.

Example:

```env
DB_USER=postgres
DB_HOST=localhost
DB_NAME=ats_resume_pipeline
DB_PASSWORD=your_password
DB_PORT=5432
```

`.env` is excluded using `.gitignore`.

---

# 📦 Local File Storage

During development:

```text
storage/
```

contains uploaded PDF resumes.

These files are intentionally excluded from Git.

`.gitignore`:

```gitignore
storage/*
```

This prevents candidate resumes from being committed to GitHub.

---

# ⚙️ Local Development Setup

## Prerequisites

Install:

* Node.js
* PostgreSQL
* Python 3
* Git
* Postman
* pgAdmin

---

# 1. Clone Repository

```bash
git clone https://github.com/Parth-Vaidya/ATS-Resume-Pipeline.git
```

Navigate into the project:

```bash
cd ATS-Resume-Pipeline
```

---

# 2. Backend Setup

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

---

# 3. Environment Configuration

Create:

```text
backend/.env
```

Example:

```env
PORT=5000

DB_USER=postgres
DB_HOST=localhost
DB_NAME=ats_resume_pipeline
DB_PASSWORD=your_password
DB_PORT=5432
```

---

# 4. PostgreSQL Setup

Create the database:

```sql
CREATE DATABASE ats_resume_pipeline;
```

Then execute:

```text
database/schema.sql
```

using pgAdmin or PostgreSQL.

---

# 5. Start Backend

```bash
npm run dev
```

Expected:

```text
Server is running on http://localhost:5000
Database connection successful
```

---

# 6. Python Processor Setup

Navigate to:

```bash
cd processor
```

Create a virtual environment:

```bash
python -m venv .venv
```

Activate it on Windows:

```powershell
.venv\Scripts\Activate.ps1
```

Install dependencies:

```bash
pip install -r requirements.txt
```

---

# 🐳 Docker

Docker support is planned for the production architecture.

Expected services:

```text
docker-compose
    |
    +---- Node.js API
    |
    +---- Python Processor
    |
    +---- PostgreSQL
    |
    +---- Redis
```

Example future architecture:

```text
                 Docker Compose
                       |
       +---------------+---------------+
       |               |               |
       ▼               ▼               ▼
    Node API        Python Worker    PostgreSQL
       |
       |
       ▼
     Redis
```

---

# 📈 Scalability

The architecture is designed to support horizontal scaling.

Instead of processing resumes directly inside the API server:

```text
API Server
     |
     ▼
   Queue
     |
     +---- Worker 1
     |
     +---- Worker 2
     |
     +---- Worker 3
```

This allows multiple resume-processing workers to run simultaneously.

---

# ⚡ Performance Metrics

The system will track:

```text
PDF Parse Time
Fraud Detection Time
Scoring Time
Total Processing Time
```

Example:

```json
{
  "parseTimeMs": 125,
  "fraudCheckTimeMs": 42,
  "scoringTimeMs": 830,
  "totalTimeMs": 997
}
```

These metrics can later be used for:

* Performance optimization
* Monitoring
* Capacity planning
* Debugging

---

# 📊 Future Recruiter Dashboard

A future frontend can display:

```text
Job: Backend Developer

Candidates
────────────────────────────────────
Candidate       ATS Score      Status
────────────────────────────────────
Candidate A       92.4        ACCEPTED
Candidate B       87.6        ACCEPTED
Candidate C       81.2        ACCEPTED
Candidate D        0.0        REJECTED
```

Recruiters will be able to:

* View candidates
* Sort by ATS score
* View fraud flags
* View resume information
* Filter candidates
* Inspect processing status

---

# 🚧 Development Roadmap

## Phase 1 — Project Foundation

* [x] Define project requirements
* [x] Define architecture
* [x] Create project structure
* [x] Initialize Node.js backend
* [x] Configure Express
* [x] Configure PostgreSQL
* [x] Create database schema
* [x] Configure environment variables
* [x] Establish database connection
* [x] Configure Git/GitHub

---

# Phase 2 — Job Management

* [x] Create Job API
* [x] Add request validation
* [x] Add service layer
* [x] Store Jobs in PostgreSQL
* [ ] Get Job API
* [ ] Update Job API
* [ ] Delete Job API

---

# Phase 3 — Resume Upload

* [x] Install Multer
* [x] Configure PDF upload
* [x] Validate file extension
* [x] Add file size limit
* [x] Create storage directory
* [x] Store uploaded PDF
* [x] Create candidate database record
* [ ] Improve upload error handling
* [ ] Add stronger file validation

---

# Phase 4 — Python Processing

* [ ] Create Python environment
* [ ] Install PyMuPDF
* [ ] Create parser
* [ ] Extract PDF text
* [ ] Extract PDF layout
* [ ] Extract font metadata
* [ ] Build processing entry point

---

# Phase 5 — Anti-Fraud Detection

* [ ] Implement white-text detection
* [ ] Store fraud snippets
* [ ] Store page numbers
* [ ] Store font colors
* [ ] Reject fraudulent resumes
* [ ] Add tiny-font detection
* [ ] Add suspicious text density detection
* [ ] Add out-of-page text detection
* [ ] Add keyword stuffing detection

---

# Phase 6 — ATS Scoring

* [ ] Implement text cleaning
* [ ] Implement TF-IDF
* [ ] Implement cosine similarity
* [ ] Install sentence-transformers
* [ ] Generate embeddings
* [ ] Implement semantic similarity
* [ ] Combine lexical + semantic scores
* [ ] Normalize final score

---

# Phase 7 — Node ↔ Python Integration

* [ ] Create processing service
* [ ] Implement Node → Python communication
* [ ] Process candidate
* [ ] Receive processing result
* [ ] Store ATS score
* [ ] Store fraud flags
* [ ] Update candidate status

---

# Phase 8 — Background Processing

* [ ] Install Redis
* [ ] Configure BullMQ
* [ ] Create resume queue
* [ ] Create worker
* [ ] Process batches asynchronously
* [ ] Add retry mechanism
* [ ] Add failed-job handling
* [ ] Add job status tracking

---

# Phase 9 — Authentication & Authorization

* [ ] User registration
* [ ] Login
* [ ] Password hashing
* [ ] JWT authentication
* [ ] Authorization middleware
* [ ] User-owned jobs
* [ ] User-owned candidates
* [ ] Protected endpoints

---

# Phase 10 — Production Engineering

* [ ] Centralized error handling
* [ ] Structured logging
* [ ] Rate limiting
* [ ] API documentation
* [ ] Unit tests
* [ ] Integration tests
* [ ] Docker
* [ ] Docker Compose
* [ ] Health checks
* [ ] Monitoring
* [ ] Cloud storage
* [ ] Deployment

---

# 🧠 Future Improvements

Potential future features include:

### Resume Intelligence

* Skills extraction
* Education extraction
* Experience extraction
* Project extraction
* Certification detection
* Contact information extraction

### Advanced Fraud Detection

* Tiny-font detection
* White-text detection
* Background-colored text
* Off-page text
* Keyword density analysis
* Repeated keyword detection
* Suspicious formatting analysis

### Advanced ATS Scoring

* Section-aware scoring
* Skill matching
* Experience relevance
* Education relevance
* Job seniority matching
* Semantic ranking
* Explainable scoring

### Infrastructure

* Kubernetes
* Cloud object storage
* Distributed workers
* Message queues
* Monitoring
* Automatic scaling

---

# ⚠️ Important Disclaimer

The ATS score represents **resume-to-job-description compatibility**.

It should not be treated as an absolute measure of candidate quality or as an automated hiring decision.

The system is intended to assist recruiters by:

* Reducing manual screening time
* Identifying potentially manipulated resumes
* Ranking resumes based on job relevance
* Providing structured candidate information

Human review should remain part of the hiring process.

---

# 📜 Current Project Status

```text
🚧 UNDER ACTIVE DEVELOPMENT
```

Current working pipeline:

```text
                    ┌────────────────┐
                    │   Create Job   │
                    └───────┬────────┘
                            │
                            ▼
                    ┌────────────────┐
                    │ Upload Resume  │
                    └───────┬────────┘
                            │
                            ▼
                    ┌────────────────┐
                    │ Store PDF File │
                    └───────┬────────┘
                            │
                            ▼
                    ┌────────────────┐
                    │ Create Candidate│
                    │     Record     │
                    └───────┬────────┘
                            │
                            ▼
                    ┌────────────────┐
                    │ Python Parser  │
                    │    NEXT STEP   │
                    └────────────────┘
```

---

# 👨‍💻 Author

**Parth Vaidya**

GitHub:

[https://github.com/Parth-Vaidya/ATS-Resume-Pipeline](https://github.com/Parth-Vaidya/ATS-Resume-Pipeline)

---

# 📄 License

This project is currently under development.

License information will be added before public release.

```

This version is much closer to a **proper engineering-project README** rather than just documentation of what we've built so far. You can keep updating the `[ ]` → `[x]` checkboxes as we complete each phase.
```
