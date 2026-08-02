def find_food_reason(meal_plan, food_name):

    food_name = food_name.lower()

    for meal_type, foods in meal_plan.items():

        for item in foods:

            if item["food"].lower() == food_name:

                return (
                    f"{item['food']} was recommended because "
                    f"{item['reason']}."
                )

    return None