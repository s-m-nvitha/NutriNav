FOOD_MAP = {
    "Vitamin D": {
        "default": [
            "Salmon",
            "Egg Yolk",
            "Fortified Milk"
        ],
        "vegetarian": [
            "Mushrooms",
            "Eggs",
            "Fortified Milk"
        ],
        "vegan": [
            "Mushrooms",
            "Fortified Soy Milk",
            "Fortified Cereals"
        ]
    },

    "Iron": {
        "default": [
            "Spinach",
            "Lentils",
            "Beans"
        ]
    },

    "Vitamin B12": {
        "default": [
            "Fish",
            "Eggs",
            "Dairy Products"
        ],
        "vegetarian": [
            "Eggs",
            "Milk",
            "Yogurt"
        ],
        "vegan": [
            "Fortified Cereals",
            "Nutritional Yeast",
            "Fortified Plant Milk"
        ]
    }
}

ALLERGY_FILTERS = {
    "dairy": [
        "Milk",
        "Yogurt",
        "Cheese",
        "Dairy Products",
        "Fortified Milk",
        "Fortified Plant Milk",
        "Fortified Soy Milk"
    ],

    "egg": [
        "Eggs",
        "Egg Yolk"
    ],

    "soy": [
        "Fortified Soy Milk"
    ]
}

DISEASE_TIPS = {
    "diabetes": [
        "Choose low glycemic foods",
        "Avoid sugary beverages",
        "Prefer whole grains over refined grains"
    ],

    "hypertension": [
        "Reduce sodium intake",
        "Choose fresh foods over processed foods",
        "Increase potassium-rich foods"
    ],

    "pcos": [
        "Prioritize high-fiber foods",
        "Limit refined carbohydrates",
        "Include protein in every meal"
    ]
}


def get_food_recommendations(deficiencies, profile=None):
    recommendations = {}

    diet = ""
    allergies = ""
    diseases = ""

    if profile:
        if profile.dietary_preference:
            diet = profile.dietary_preference.lower()

        if profile.allergies:
            allergies = profile.allergies.lower()

        if profile.diseases:
            diseases = profile.diseases.lower()

    for deficiency in deficiencies:
        nutrient = deficiency.nutrient_name

        if nutrient not in FOOD_MAP:
            continue

        nutrient_foods = FOOD_MAP[nutrient]

        if "vegan" in diet and "vegan" in nutrient_foods:
            recommendations[nutrient] = nutrient_foods["vegan"]

        elif "vegetarian" in diet and "vegetarian" in nutrient_foods:
            recommendations[nutrient] = nutrient_foods["vegetarian"]

        else:
            recommendations[nutrient] = nutrient_foods["default"]

        # Apply allergy filtering
        if allergies:
            filtered_foods = recommendations[nutrient]

            for allergy, restricted_foods in ALLERGY_FILTERS.items():
                if allergy in allergies:
                    filtered_foods = [
                        food
                        for food in filtered_foods
                        if food not in restricted_foods
                    ]

            recommendations[nutrient] = filtered_foods

    if diseases:
        tips = []

        for disease, disease_tips in DISEASE_TIPS.items():
            if disease in diseases:
                tips.extend(disease_tips)

        if tips:
            recommendations["Health Tips"] = tips

    return recommendations