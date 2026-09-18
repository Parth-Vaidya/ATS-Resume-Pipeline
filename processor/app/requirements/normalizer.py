import re


ALIASES = {
    "node js": "node.js",
    "nodejs": "node.js",
    "react js": "react",
    "reactjs": "react",
    "postgres": "postgresql",
    "postgre sql": "postgresql",
    "mongo": "mongodb",
    "mongo db": "mongodb",
}


def normalize_term(term):
    term = term.strip().lower()

    # Normalize repeated whitespace
    term = re.sub(r"\s+", " ", term)

    # Apply known aliases
    term = ALIASES.get(term, term)

    return term