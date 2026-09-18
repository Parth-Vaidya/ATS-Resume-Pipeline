from matcher import match_requirements


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


resume_text = """
Experienced backend developer.

Built REST APIs using Node.js and Express.js.
Worked with PostgreSQL and Docker.
Developed backend applications using JavaScript.
"""


result = match_requirements(
    requirements,
    resume_text
)

print(result)