from parser import extract_text
from validator import detect_white_text
from cleaner import clean_text
from requirements.matcher import match_requirements
from scorer import calculate_ats_score

import json


def process_resume(pdf_path, requirements, scoring_config=None):

    text = extract_text(pdf_path)

    fraud_flags = detect_white_text(pdf_path)

    if fraud_flags:

        print("\nFraud detected!")

        return {
            "status": "REJECTED",
            "ats_score": 0,
            "fraud_flags": fraud_flags
        }

    print("\nNo fraud detected.")

    cleaned_text = clean_text(text)

    matching_result = match_requirements(
        requirements,
        cleaned_text
    )

    ats_score = calculate_ats_score(
        required_score=matching_result["required_skills"]["score"],
        preferred_score=matching_result["preferred_skills"]["score"],
        language_score=matching_result["languages"]["score"],
        keyword_score=matching_result["keywords"]["score"],
        scoring_config=scoring_config
    )

    return {
        "status": "ACCEPTED",
        "ats_score": ats_score,
        "fraud_flags": [],
        "matching": matching_result
    }


if __name__ == "__main__":

    requirements = {
        "required_skills": [
            "Node.js",
            "PostgreSQL",
            "Docker"
        ],
        "preferred_skills": [
            "Redis",
            "AWS"
        ],
        "languages": [
            "JavaScript",
            "Python"
        ],
        "keywords": [
            "REST API",
            "backend",
            "microservices"
        ]
    }

    scoring_config = {
        "required_skills": 50,
        "preferred_skills": 20,
        "languages": 15,
        "keywords": 15
    }

    result = process_resume(
        "../../storage/1789407216819-202411095_Resume.pdf",
        requirements,
        scoring_config
    )

    print("\nFinal Result:")
    print(json.dumps(result, indent=4))