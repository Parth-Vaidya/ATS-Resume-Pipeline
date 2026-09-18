from validator import detect_white_text


pdf_path = "../../storage/rouhg2.pdf"

results = detect_white_text(pdf_path)

print("Detected white text:")
print(results)