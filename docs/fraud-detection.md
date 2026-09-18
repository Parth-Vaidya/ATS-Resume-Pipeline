# Fraud Detection

The fraud detection component identifies techniques that can manipulate ATS systems by adding content that is not normally visible to a human reviewer.

## V1 Detection

The current version focuses on **hidden white-text detection**.

Some resumes may contain keywords in white or near-white text so that they are difficult or impossible for a human to see while still being extracted by an ATS.

The system examines the text formatting information inside the PDF to identify such content.

## Detection Process

```text
PDF
 ↓
Inspect Text Elements
 ↓
Check Font Properties
 ↓
Identify White / Near-White Text
 ↓
Record Evidence

When suspicious text is detected, the system records information such as:

Detected text snippet
Page number
Font color
Fraud type
Candidate Handling

If hidden white text is detected:

The candidate is marked as REJECTED.
The ATS score is set to 0.
The detected content is stored as fraud evidence.
Further ATS processing is stopped for that candidate.

This prevents suspicious content from influencing the requirement matching process.

Clean Resume

If no suspicious text is detected, the resume continues through the normal pipeline:

Fraud Check Passed
       ↓
Text Cleaning
       ↓
Requirement Matching
       ↓
ATS Scoring
V1 Scope

The first version intentionally focuses on one clear and measurable fraud technique.

Future versions may detect additional ATS manipulation techniques such as other forms of hidden content or suspicious document formatting.