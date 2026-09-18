from semantic_scorer import calculate_similarity


job_description = """
Develop scalable REST APIs using Node.js and Express.js.
Work with PostgreSQL databases and backend services.
"""


resume_text = """
Built backend services and RESTful APIs using Node.js and Express.
Developed applications using PostgreSQL.
"""


score = calculate_similarity(
    job_description,
    resume_text
)

print(f"Semantic similarity score: {score}")