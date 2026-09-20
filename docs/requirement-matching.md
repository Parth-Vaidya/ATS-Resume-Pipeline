# Requirement Matching

The requirement matching component compares a resume with the requirements defined by the recruiter for a particular job.

## Recruiter-Defined Requirements

Requirements are provided when creating a job and stored with the job information.

They can include:

- Required skills
- Preferred skills
- Programming languages
- Keywords
- Minimum experience requirements (planned)

The requirements are **dynamic** and are not hardcoded into the processing system.

## Requirement Storage

Requirements are stored in PostgreSQL using the JSONB data type.

Each job can therefore define its own requirements without changing the Python processing code.

The currently supported categories are:

- `required_skills`
- `preferred_skills`
- `languages`
- `keywords`


Example structure:

{
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
}


### Experience Requirements

Experience-based requirements are not currently included in the ATS scoring implementation.

They may be added in a future version.


## Matching Process

```text
Recruiter Requirements
        ↓
Normalize Requirements
        ↓
Clean Resume Text
        ↓
Compare Requirements
        ↓
Matched / Missing Requirements
        ↓
Category Scores
```

## Normalization

Different ways of writing the same technology can be normalized before matching.

For example:

- NodeJS
- Node JS
- Node.js

can be treated as the same requirement.

This improves consistency when comparing recruiter requirements with resume content.

## Matching Result

For each requirement category, the system records:

- Matched requirements
- Missing requirements
- Matching percentage

This provides more information than a single overall score and allows the recruiter to understand why a candidate received a particular result.

## Current Limitation

Version 1 primarily uses normalized text matching.

It does not perform semantic similarity analysis.

Therefore, technically equivalent phrases may not always be recognized when they use significantly different wording.

Semantic matching may be introduced in a future version.
