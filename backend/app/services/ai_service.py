import os
from dotenv import load_dotenv
from google import genai

from .knowledge_retriever import retrieve_knowledge
from .meal_explainer import find_food_reason

load_dotenv()

client = genai.Client(
    api_key=os.getenv("GEMINI_API_KEY")
)


def generate_nutrition_response(
    user_context,
    meal_context,
    chat_history,
    question
):

    # -----------------------------
    # Build chat history
    # -----------------------------
    history_text = ""

    for chat in chat_history:
        history_text += (
            f"User: {chat['user']}\n"
            f"Assistant: {chat['assistant']}\n\n"
        )


    # -----------------------------
    # Meal explanation shortcut
    # -----------------------------

    meal_words = [
        "breakfast",
        "lunch",
        "dinner",
        "snacks",
        "meal"
    ]


    if not any(word in question.lower() for word in meal_words):

        reason = find_food_reason(
            user_context.get("meal_plan", {}),
            question
        )

        if reason:
            return reason


    # -----------------------------
    # Knowledge Retrieval
    # -----------------------------

    knowledge = retrieve_knowledge(question)


    # -----------------------------
    # Deficiency-Aware Retrieval
    # -----------------------------

    deficiencies = user_context.get(
        "deficiencies",
        []
    )


    for deficiency in deficiencies:

        if isinstance(deficiency, dict):

            nutrient = deficiency.get(
                "nutrient",
                ""
            )

        else:

            nutrient = str(deficiency)


        knowledge += retrieve_knowledge(
            nutrient
        )


    # -----------------------------
    # Fallback Knowledge
    # -----------------------------

    if not knowledge:

        knowledge = """
        Use your nutrition knowledge.
        Give evidence-based dietary guidance.
        """


    # -----------------------------
    # AI Prompt
    # -----------------------------

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

MEAL PLAN CONTEXT:
{meal_context}

NUTRITION KNOWLEDGE:
{knowledge}

IMPORTANT:
- Use nutrition knowledge whenever relevant.
- If user has deficiencies, prioritize those deficiencies.
- If user asks what to eat, generate recommendations from meal plans and nutrition knowledge.
- If user asks for breakfast, lunch, snacks, or dinner, give personalized recommendations.
- Remember previous conversation context.
- Personalize answers using deficiencies, allergies, diseases, and dietary preferences.
- Keep recommendations practical and realistic.
- If meal plan data is available, use it first.

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