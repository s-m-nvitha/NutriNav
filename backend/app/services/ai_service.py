import os
from dotenv import load_dotenv
from google import genai

load_dotenv()

client = genai.Client(
    api_key=os.getenv("GEMINI_API_KEY")
)


def generate_nutrition_response(
    user_context,
    chat_history,
    question
):

    history_text = ""

    for chat in chat_history:
        history_text += (
            f"User: {chat['user']}\n"
            f"Assistant: {chat['assistant']}\n\n"
        )

    prompt = f"""
You are NutriNav AI, a personalized nutrition assistant.

IMPORTANT RULES:
- Give nutrition and wellness guidance only.
- Use the user's health profile and deficiencies when relevant.
- Do not diagnose diseases.
- Do not prescribe medicines.
- If information is missing, say so clearly.
- Keep answers practical and easy to understand.
- Prefer food-based recommendations.

USER CONTEXT:
{user_context}

PREVIOUS CHAT HISTORY:
{history_text}

CURRENT USER QUESTION:
{question}

Provide a personalized response.
"""

    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=prompt
    )

    return response.text