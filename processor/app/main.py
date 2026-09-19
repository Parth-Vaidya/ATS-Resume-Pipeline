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
        # print("\nFraud detected!")
        return {
            "status": "REJECTED",
            "ats_score": 0,
            "fraud_flags": fraud_flags
        }

    # print("\nNo fraud detected.")
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
    input_data = json.loads(input())

    pdf_path = input_data["pdf_path"]
    requirements = input_data["requirements"]
    scoring_config = input_data.get("scoring_config")

    result = process_resume(
        pdf_path,
        requirements,
        scoring_config
    )

    print(json.dumps(result))