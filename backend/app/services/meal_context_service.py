from .meal_planner import get_meal_plan


def get_meal_context(deficiencies, profile):

    meal_plan = get_meal_plan(
        deficiencies,
        profile
    )

    return meal_plan