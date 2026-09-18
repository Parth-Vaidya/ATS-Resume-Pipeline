import re


def clean_text(text):
    # Normalize line breaks
    text = text.replace("\r\n", "\n")
    text = text.replace("\r", "\n")

    # Replace tabs with spaces
    text = text.replace("\t", " ")

    # Remove spaces at the beginning/end of each line
    text = "\n".join(line.strip() for line in text.split("\n"))

    # Collapse multiple spaces
    text = re.sub(r" +", " ", text)

    # Remove excessive blank lines
    text = re.sub(r"\n\s*\n+", "\n\n", text)

    # Remove leading/trailing whitespace
    text = text.strip()

    # Normalize case
    text = text.lower()

    return text