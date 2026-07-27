from app.services.meal_planner import get_meal_plan


def get_user_meal_context(deficiencies, profile):

    meal_plan = get_meal_plan(
        deficiencies,
        profile
    )

    context = ""

    for meal_type, foods in meal_plan.items():

        context += f"\n{meal_type.upper()}:\n"

        for item in foods:

            context += (
                f"- {item['food']}: "
                f"{item['reason']}\n"
            )

    return context