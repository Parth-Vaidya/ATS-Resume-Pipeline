# ATS Scoring

The ATS scoring component produces an overall score based on how well a resume matches the requirements defined for a job.

## V1 Approach

Version 1 uses a **deterministic scoring approach**.

No machine-learning model or semantic embedding is used.

The score is calculated from the candidate's requirement matches.

## Scoring Categories

The current scoring implementation uses:

- Required skills
- Preferred skills
- Programming languages
- Keywords

Experience-based scoring may be added in a future version.

Each category contributes to the overall evaluation according to the scoring configuration.

## Default Scoring Weights

Version 1 uses the following default scoring configuration:

| Category | Weight |
|---|---:|
| Required Skills | 50% |
| Preferred Skills | 20% |
| Languages | 15% |
| Keywords | 15% |
| Total | 100% |

The scoring configuration can be customized for each job.

## Scoring Formula

The final ATS score is calculated as:

Final Score =
    Required Skills Score × 0.50
  + Preferred Skills Score × 0.20
  + Languages Score × 0.15
  + Keywords Score × 0.15

## Dynamic Scoring Configuration

The scoring weights are stored in the job's `scoring_config` JSONB field.

This allows different jobs to use different scoring configurations.

Example:

```json
{
    "required_skills": 50,
    "preferred_skills": 20,
    "languages": 15,
    "keywords": 15
}

## Scoring Flow

```text
Matched Requirements
        ↓
Calculate Category Scores
        ↓
Apply Scoring Weights
        ↓
Calculate Overall ATS Score
Score Interpretation
```

The resulting score represents the degree to which the resume matches the configured job requirements.

The score should be treated as a screening metric, not as a final hiring decision.

A candidate can also be reviewed using the detailed matched and missing requirements.

## Fraud Handling

Fraud validation occurs before scoring.

If ATS manipulation is detected:

```text
Fraud Detected
      ↓
Candidate Rejected
      ↓
ATS Score = 0
```

The candidate does not proceed to normal requirement scoring.

## Future Improvements

Future versions may introduce semantic or machine-learning-based matching to better understand skills and experience that are expressed differently in a resume.

Such models are intentionally excluded from V1.