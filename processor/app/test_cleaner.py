from cleaner import clean_text


sample_text = """
    SOFTWARE   ENGINEER


    Node.js     Express.js
    PostgreSQL
    C++   C#
    CI/CD
"""


cleaned_text = clean_text(sample_text)

print("Original:")
print(sample_text)

print("\nCleaned:")
print(cleaned_text)
