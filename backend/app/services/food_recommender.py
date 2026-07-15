FOOD_MAP = {
    "Vitamin D": [
        "Salmon",
        "Egg Yolk",
        "Fortified Milk"
    ],
    "Iron": [
        "Spinach",
        "Lentils",
        "Beans"
    ],
    "Vitamin B12": [
        "Fish",
        "Eggs",
        "Dairy Products"
    ]
}


def get_food_recommendations(deficiencies):
    recommendations = {}

    for deficiency in deficiencies:
        nutrient = deficiency.nutrient_name

        if nutrient in FOOD_MAP:
            recommendations[nutrient] = FOOD_MAP[nutrient]

    return recommendations