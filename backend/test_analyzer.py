from app.services.deficiency_analyzer import analyze_deficiencies

text = """Hemoglobin (HB/Hgb))
6.5
L**
g/dL
14.0-18.0"""

print("RAW TEXT:")
print(repr(text))

print("\nRESULT:")
print(analyze_deficiencies(text))