import os
from dotenv import load_dotenv
import google.generativeai as genai


load_dotenv()


genai.configure(
    api_key=os.getenv("GEMINI_API_KEY")
)


model = genai.GenerativeModel(
    "gemini-2.5-flash"
)



def explain_meal_with_ai(
    food,
    deficiencies,
    profile
):

    deficiency_text = ", ".join(
        [
            d.nutrient_name
            for d in deficiencies
        ]
    )


    profile_text = ""


    if profile:

        profile_text = f"""
Diet:
{profile.dietary_preference}

Health conditions:
{profile.diseases}

Allergies:
{profile.allergies}
"""


    prompt = f"""

You are NutriNav AI nutrition assistant.

Explain why this food was recommended.

Food:
{food}


Detected deficiencies:
{deficiency_text}


User health information:
{profile_text}


Rules:
- Explain in simple language.
- Focus only on nutrition.
- Do not diagnose diseases.
- Do not prescribe medicines.
- Keep answer under 4 sentences.

"""


    response = model.generate_content(
        prompt
    )


    return response.text