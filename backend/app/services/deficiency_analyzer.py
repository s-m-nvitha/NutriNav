import re


def analyze_deficiencies(text):
    deficiencies = []

    # Hemoglobin
    hgb_match = re.search(
        r"Hemoglobin.*?\n([0-9]+\.?[0-9]*)",
        text,
        re.IGNORECASE | re.DOTALL
    )

    if hgb_match:
        hgb = float(hgb_match.group(1))

        if hgb < 8:
            deficiencies.append({
                "nutrient": "Iron",
                "value": hgb,
                "unit": "g/dL",
                "severity": "severe"
            })

        elif hgb < 12:
            deficiencies.append({
                "nutrient": "Iron",
                "value": hgb,
                "unit": "g/dL",
                "severity": "moderate"
            })

    return deficiencies