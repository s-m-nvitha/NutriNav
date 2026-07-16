def get_meal_plan(deficiencies, profile=None):

    meal_plan = {
        "breakfast": [],
        "lunch": [],
        "snacks": [],
        "dinner": []
    }


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



    # -----------------------------
    # Base meals
    # -----------------------------

    meal_plan["breakfast"] = [
        {
            "food": "Vegetable oats",
            "reason": "High fiber meal that supports balanced nutrition and blood sugar control"
        },
        {
            "food": "Whole grain toast",
            "reason": "Provides complex carbohydrates for sustained energy"
        },
        {
            "food": "Fruit bowl",
            "reason": "Provides vitamins, minerals, and antioxidants"
        }
    ]


    meal_plan["lunch"] = [
        {
            "food": "Brown rice",
            "reason": "Provides healthy carbohydrates and energy"
        },
        {
            "food": "Dal",
            "reason": "Rich vegetarian protein source"
        },
        {
            "food": "Mixed vegetables",
            "reason": "Provides essential vitamins and minerals"
        }
    ]


    meal_plan["snacks"] = [
        {
            "food": "Nuts",
            "reason": "Provides healthy fats and supports overall nutrition"
        },
        {
            "food": "Seasonal fruits",
            "reason": "Provides natural vitamins and antioxidants"
        }
    ]


    meal_plan["dinner"] = [
        {
            "food": "Chapati",
            "reason": "Provides complex carbohydrates"
        },
        {
            "food": "Vegetable curry",
            "reason": "Supports micronutrient intake"
        },
        {
            "food": "Lentil soup",
            "reason": "Provides protein and supports iron intake"
        }
    ]



    # -----------------------------
    # Deficiency based additions
    # -----------------------------

    for deficiency in deficiencies:

        nutrient = deficiency.nutrient_name


        if nutrient == "Vitamin D":

            meal_plan["breakfast"].append(
                {
                    "food": "Fortified foods",
                    "reason": "Added because Vitamin D deficiency was detected"
                }
            )

            meal_plan["snacks"].append(
                {
                    "food": "Mushrooms",
                    "reason": "Natural source that supports Vitamin D intake"
                }
            )


        elif nutrient == "Vitamin B12":

            meal_plan["breakfast"].append(
                {
                    "food": "B12 fortified cereals",
                    "reason": "Added because Vitamin B12 deficiency was detected"
                }
            )

            meal_plan["snacks"].append(
                {
                    "food": "Fortified cereals",
                    "reason": "Supports Vitamin B12 intake"
                }
            )


        elif nutrient == "Iron":

            meal_plan["lunch"].append(
                {
                    "food": "Spinach dal",
                    "reason": "Iron-rich meal recommended for low iron levels"
                }
            )

            meal_plan["dinner"].append(
                {
                    "food": "Beans and lentils",
                    "reason": "Provides plant-based iron and protein"
                }
            )



    # -----------------------------
    # Disease customization
    # -----------------------------

    if "diabetes" in diseases:

        meal_plan["snacks"] = [
            {
                "food": "Nuts",
                "reason": "Provides healthy fats with low sugar impact"
            },
            {
                "food": "Apple",
                "reason": "Lower glycemic fruit option"
            }
        ]


        meal_plan["breakfast"].append(
            {
                "food": "Low glycemic oats",
                "reason": "Helps support better blood sugar management"
            }
        )



    # -----------------------------
    # Diet customization
    # -----------------------------

    if "vegan" in diet:

        non_vegan_keywords = [
            "egg",
            "milk",
            "yogurt"
        ]

        for meal in meal_plan:

            meal_plan[meal] = [
                item
                for item in meal_plan[meal]
                if not any(
                    keyword in item["food"].lower()
                    for keyword in non_vegan_keywords
                )
            ]



    if "vegetarian" in diet:

        non_veg_keywords = [
            "chicken",
            "fish",
            "meat"
        ]

        for meal in meal_plan:

            meal_plan[meal] = [
                item
                for item in meal_plan[meal]
                if not any(
                    keyword in item["food"].lower()
                    for keyword in non_veg_keywords
                )
            ]



    # -----------------------------
    # Allergy filtering
    # -----------------------------

    if "dairy" in allergies:

        dairy_keywords = [
            "milk",
            "yogurt"
        ]


        for meal in meal_plan:

            meal_plan[meal] = [
                item
                for item in meal_plan[meal]
                if not any(
                    keyword in item["food"].lower()
                    for keyword in dairy_keywords
                )
            ]



    return meal_plan