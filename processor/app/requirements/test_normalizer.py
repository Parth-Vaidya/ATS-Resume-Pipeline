from normalizer import normalize_term


test_terms = [
    "Node.js",
    "NodeJS",
    "node js",
    "ReactJS",
    "Postgres",
    "Mongo DB",
    "Docker"
]


for term in test_terms:
    print(f"{term} → {normalize_term(term)}")