# Fraud Detection

The fraud detection component identifies techniques that can manipulate ATS systems by adding content that is not normally visible to a human reviewer.

## V1 Detection

The current version focuses on **hidden white-text detection**.

Some resumes may contain keywords in white or near-white text so that they are difficult or impossible for a human to see while still being extracted by an ATS.

The system examines the text formatting information inside the PDF to identify such content.

## Detection Threshold

The current implementation flags a text span as white or near-white when:

R > 245
G > 245
B > 245

The detection is performed using PDF text span color information provided by PyMuPDF.



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
```

When suspicious text is detected, the system records information such as:

- Detected text snippet
- Page number
- Font color
- Fraud type

## Candidate Handling

If hidden white text is detected:

- The candidate is marked as REJECTED.
- The ATS score is set to 0.
- The detected content is stored as fraud evidence.
- Further ATS processing is stopped for that candidate.

This prevents suspicious content from influencing the requirement matching process.

## Clean Resume

If no suspicious text is detected, the resume continues through the normal pipeline:

```text
Fraud Check Passed
       ↓
Text Cleaning
       ↓
Requirement Matching
       ↓
ATS Scoring
```

## Current Limitation

Version 1 currently focuses on detecting white or near-white text.

Other ATS manipulation techniques are not currently detected.

Future versions may add detection for:

- Extremely small text
- Transparent text
- Hidden PDF layers
- Suspicious text positioning
- Excessive keyword stuffing
- Other PDF-level manipulation techniques