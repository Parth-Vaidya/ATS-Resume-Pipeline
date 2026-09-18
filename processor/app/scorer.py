def calculate_ats_score(
    required_score,
    preferred_score,
    language_score,
    keyword_score,
    scoring_config=None
):

    if scoring_config is None:
        scoring_config = {
            "required_skills": 50,
            "preferred_skills": 20,
            "languages": 15,
            "keywords": 15
        }

    score = (
        required_score * scoring_config.get("required_skills", 0) / 100
        + preferred_score * scoring_config.get("preferred_skills", 0) / 100
        + language_score * scoring_config.get("languages", 0) / 100
        + keyword_score * scoring_config.get("keywords", 0) / 100
    )

    return round(score, 2)