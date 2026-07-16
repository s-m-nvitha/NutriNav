import re


def analyze_deficiencies(text: str):
    text = text.lower()

    results = []


    # Vitamin D
    vitamin_d_match = re.search(
        r"(vitamin\s*d|vit\s*d|25[-\s]?oh\s*vitamin\s*d).*?(\d+\.?\d*)",
        text
    )

    if vitamin_d_match:
        value = float(vitamin_d_match.group(2))

        if value < 20:
            severity = "severe"
        elif value < 30:
            severity = "moderate"
        else:
            severity = "normal"

        if severity != "normal":
            results.append({
                "nutrient": "Vitamin D",
                "value": value,
                "unit": "ng/mL",
                "severity": severity
            })


    # Vitamin B12
    b12_match = re.search(
        r"(vitamin\s*b12|b12|cobalamin).*?(\d+\.?\d*)",
        text
    )

    if b12_match:
        value = float(b12_match.group(2))

        if value < 200:
            severity = "severe"
        elif value < 300:
            severity = "moderate"
        else:
            severity = "normal"

        if severity != "normal":
            results.append({
                "nutrient": "Vitamin B12",
                "value": value,
                "unit": "pg/mL",
                "severity": severity
            })


    # Iron
    iron_match = re.search(
        r"(iron|serum\s*iron).*?(\d+\.?\d*)",
        text
    )

    if iron_match:
        value = float(iron_match.group(2))

        if value < 50:
            severity = "severe"
        elif value < 70:
            severity = "moderate"
        else:
            severity = "normal"

        if severity != "normal":
            results.append({
                "nutrient": "Iron",
                "value": value,
                "unit": "µg/dL",
                "severity": severity
            })


    return results