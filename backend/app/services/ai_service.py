import os
from dotenv import load_dotenv
from google import genai

load_dotenv()

print("========== DEBUG ==========")
print("GEMINI_API_KEY:", os.getenv("GEMINI_API_KEY"))
print("===========================")

client = genai.Client(
    api_key=os.getenv("GEMINI_API_KEY")
)

def generate_nutrition_response(
    user_context,
    question
):

    prompt = f"""
    You are NutriNav AI.

    User Profile:
    {user_context}

    User Question:
    {question}

    Give personalized nutrition advice.
    """

    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=prompt
    )

    return response.text