def find_food_reason(meal_plan, question):

    question_lower = question.lower()

    for meal_type, foods in meal_plan.items():

        for item in foods:

            food_name = item["food"].lower()

            if food_name in question_lower:

                return (
                    f"{item['food']} was recommended because "
                    f"{item['reason']}."
                )

    return None