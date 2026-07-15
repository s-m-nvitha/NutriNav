def analyze_deficiencies(text: str):
    text = text.lower()

    deficiencies = []

    if "vitamin d" in text:
        deficiencies.append("Vitamin D")

    if "vitamin b12" in text:
        deficiencies.append("Vitamin B12")

    if "iron" in text:
        deficiencies.append("Iron")

    if "calcium" in text:
        deficiencies.append("Calcium")

    return deficiencies