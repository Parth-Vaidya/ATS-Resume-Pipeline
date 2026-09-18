import pymupdf


def color_to_rgb(color):
    r = (color >> 16) & 255
    g = (color >> 8) & 255
    b = color & 255

    return r, g, b

def detect_white_text(pdf_path):

    document = pymupdf.open(pdf_path)

    detected = []

    for page_number, page in enumerate(document, start=1):

        blocks = page.get_text("dict")["blocks"]

        for block in blocks:

            if "lines" not in block:
                continue

            for line in block["lines"]:

                for span in line["spans"]:

                    text = span["text"].strip()

                    if not text:
                        continue

                    color = span["color"]

                    r, g, b = color_to_rgb(color)

                    if r > 245 and g > 245 and b > 245:

                        detected.append({
                            "type": "WHITE_TEXT",
                            "snippet": text,
                            "page_number": page_number,
                            "font_color": (r, g, b)
                        })

    document.close()

    return detected