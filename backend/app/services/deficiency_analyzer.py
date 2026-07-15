import re


def analyze_deficiencies(text: str):
    text = text.lower()

    deficiencies = []

    nutrients = {
        "vitamin d": "Vitamin D",
        "vitamin b12": "Vitamin B12",
        "iron": "Iron",
        "calcium": "Calcium"
    }

    deficiency_words = [
        "low",
        "deficient",
        "insufficient",
        "below normal"
    ]

    for keyword, display_name in nutrients.items():

        # Looks for:
        # Vitamin D : Low
        # Vitamin B12 : Deficient

        pattern = rf"{keyword}\s*:\s*([a-z ]+)"

        match = re.search(pattern, text)

        if match:
            status = match.group(1).strip()

            for word in deficiency_words:
                if word in status:
                    deficiencies.append(display_name)
                    break

    return deficiencies