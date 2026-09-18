import pymupdf
def extract_text(pdf_path):
    document = pymupdf.open(pdf_path)

    pages = []

    for page in document:
        text = page.get_text()
        pages.append(text)

    document.close()

    return "\n".join(pages)