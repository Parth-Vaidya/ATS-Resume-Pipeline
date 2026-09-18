from parser import extract_text


pdf_path = "../../storage/1789407216819-202411095_Resume.pdf"

text = extract_text(pdf_path)

print(text)