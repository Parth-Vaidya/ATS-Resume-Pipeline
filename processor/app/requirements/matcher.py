from .normalizer import normalize_term


def match_terms(required_terms, resume_text):
    normalized_resume = resume_text.lower()

    matched = []
    missing = []

    for term in required_terms:

        normalized_term = normalize_term(term)

        if normalized_term in normalized_resume:
            matched.append(term)
        else:
            missing.append(term)

    total = len(required_terms)

    if total == 0:
        score = 100.0
    else:
        score = (len(matched) / total) * 100

    return {
        "matched": matched,
        "missing": missing,
        "score": round(score, 2)
    }


def match_requirements(requirements, resume_text):

    result = {}

    result["required_skills"] = match_terms(
        requirements.get("required_skills", []),
        resume_text
    )

    result["preferred_skills"] = match_terms(
        requirements.get("preferred_skills", []),
        resume_text
    )

    result["languages"] = match_terms(
        requirements.get("languages", []),
        resume_text
    )

    result["keywords"] = match_terms(
        requirements.get("keywords", []),
        resume_text
    )

    return result