import fitz

def extract_text_from_pdf(pdf_path):
    text = ""

    try:
        doc = fitz.open(pdf_path)

        for page in doc:
            text += page.get_text()

        doc.close()

        print("========== PDF TEXT ==========")
        print(text)
        print("========== END ==========")

    except Exception as e:
        print(f"PDF extraction error: {e}")

    return text