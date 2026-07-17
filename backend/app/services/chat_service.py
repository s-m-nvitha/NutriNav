from sqlalchemy.orm import Session
from ..models.chat_message import ChatMessage


def save_chat_message(
    db: Session,
    user_id: int,
    message: str,
    response: str
):
    chat = ChatMessage(
        user_id=user_id,
        message=message,
        response=response
    )

    db.add(chat)
    db.commit()

    return chat


def generate_chat_response(
    message,
    deficiencies,
    recommendations,
    profile
):
    message = message.lower()

    if "tired" in message or "fatigue" in message:

        for d in deficiencies:

            if d.nutrient_name == "Iron":

                return (
                    "Your report shows Iron deficiency. "
                    "Low Iron can reduce oxygen transport "
                    "and may cause fatigue and weakness."
                )

    if "food" in message:

        foods = set()

        for value in recommendations.values():

            if isinstance(value, list):
                foods.update(value)

        return (
            "Recommended foods: "
            + ", ".join(foods)
        )

    return (
        "Based on your report, I recommend "
        "following your personalized nutrition plan."
    )