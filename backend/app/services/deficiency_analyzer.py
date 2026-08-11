import re


def analyze_deficiencies(text):
    print("🔥 ANALYZER FUNCTION CALLED 🔥")

    deficiencies = []

    # Normalize PDF text
    text = text.replace("\r", "")
    text = text.replace("\xa0", " ")

    print("========== HEMOGLOBIN SEARCH ==========")

    # Debug: show the area around Hemoglobin
    debug_match = re.search(
        r"hemoglobin.{0,100}",
        text,
        re.IGNORECASE | re.DOTALL
    )

    if debug_match:
        print("Hemoglobin area:")
        print(repr(debug_match.group(0)))
    else:
        print("Hemoglobin label not found")

    # --------------------------------------------------
    # Find Hemoglobin value
    # --------------------------------------------------
    #
    # Handles:
    #
    # Hemoglobin
    # 6.5
    #
    # Hemoglobin (HB/Hgb))
    # 6.5
    #
    # Hemoglobin (Hgb)
    # 6.5
    #
    hemoglobin_pattern = re.compile(
        r"Hemoglobin"
        r".{0,50}?"
        r"([0-9]+(?:\.[0-9]+)?)",
        re.IGNORECASE | re.DOTALL
    )

    hgb_match = hemoglobin_pattern.search(text)

    if hgb_match:
        hgb = float(hgb_match.group(1))

        print("Hemoglobin found:", hgb)

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

    else:
        print("Hemoglobin value NOT found")

    print("=======================================")

    print("========== DEFICIENCIES ==========")
    print(deficiencies)
    print("==================================")

    return deficiencies