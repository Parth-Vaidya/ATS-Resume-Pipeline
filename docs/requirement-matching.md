# Requirement Matching

The requirement matching component compares a resume with the requirements defined by the recruiter for a particular job.

## Recruiter-Defined Requirements

Requirements are provided when creating a job and stored with the job information.

They can include:

- Required skills
- Preferred skills
- Programming languages
- Keywords
- Minimum experience requirements

The requirements are **dynamic** and are not hardcoded into the processing system.

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

## V1 Approach

Version 1 uses deterministic text-based matching.

It does not use machine-learning or semantic embedding models.

Future versions may introduce semantic matching to better understand equivalent skills and contextual mentions.