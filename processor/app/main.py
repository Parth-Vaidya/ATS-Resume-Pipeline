from parser import extract_text
from validator import detect_white_text
from cleaner import clean_text
from requirements.matcher import match_requirements
from scorer import calculate_ats_score


def process_resume(pdf_path, requirements, scoring_config=None):

    text = extract_text(pdf_path)

    print("\nExtracted resume text:")
    print(text)

    fraud_flags = detect_white_text(pdf_path)

    if fraud_flags:

        print("\nFraud detected!")
        print(fraud_flags)

        return {
            "status": "REJECTED",
            "ats_score": 0,
            "fraud_flags": fraud_flags
        }

    print("\nNo fraud detected.")

    cleaned_text = clean_text(text)

    print("\nCleaned resume text:")
    print(cleaned_text)

    matching_result = match_requirements(
        requirements,
        cleaned_text
    )

    print("\nRequirement matching:")
    print(matching_result)

    ats_score = calculate_ats_score(
        required_score=matching_result["required_skills"]["score"],
        preferred_score=matching_result["preferred_skills"]["score"],
        language_score=matching_result["languages"]["score"],
        keyword_score=matching_result["keywords"]["score"],
        scoring_config=scoring_config
    )

    print("\nATS Score:")
    print(ats_score)

    print("\nRequirements:")
    print(requirements)

    print("\nScoring config:")
    print(scoring_config)


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

    process_resume(
        "../../storage/1789407216819-202411095_Resume.pdf",
        requirements,
        scoring_config
    )