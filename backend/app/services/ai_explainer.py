def build_profile_context(profile):

    if not profile:
        return ""

    context = []

    if profile.age:
        context.append(
            f"Age: {profile.age}"
        )

    if profile.gender:
        context.append(
            f"Gender: {profile.gender}"
        )

    if profile.dietary_preference:
        context.append(
            f"Diet preference: {profile.dietary_preference}"
        )

    if profile.lifestyle:
        context.append(
            f"Lifestyle: {profile.lifestyle}"
        )

    if profile.diseases:
        context.append(
            f"Health conditions: {profile.diseases}"
        )

    if profile.allergies:
        context.append(
            f"Allergies: {profile.allergies}"
        )

    if profile.goal:
        context.append(
            f"Health goal: {profile.goal}"
        )

    return ". ".join(context)



def generate_explanation(deficiencies, profile=None):

    explanations = []

    profile_context = build_profile_context(profile)


    for item in deficiencies:

        nutrient = item["nutrient"]
        severity = item["severity"]
        value = item["value"]
        unit = item["unit"]


        if nutrient == "Vitamin D":

            explanation = (
                f"Your Vitamin D level is {value} {unit}, "
                f"which indicates a {severity} deficiency. "
                "Low Vitamin D may affect bone strength, immunity, "
                "and overall energy levels."
            )


        elif nutrient == "Vitamin B12":

            explanation = (
                f"Your Vitamin B12 level is {value} {unit}, "
                f"showing a {severity} deficiency. "
                "Low Vitamin B12 may contribute to fatigue, weakness, "
                "and nerve-related problems."
            )


        elif nutrient == "Iron":

            explanation = (
                f"Your Iron level is {value} {unit}, "
                f"which indicates a {severity} deficiency. "
                "Low Iron levels may reduce oxygen transport "
                "and can contribute to tiredness."
            )


        else:

            explanation = (
                f"{nutrient} level requires attention "
                "based on your medical report."
            )



        explanations.append({
            "nutrient": nutrient,
            "severity": severity,
            "explanation": explanation
        })


    return {
    "deficiencies": explanations,
    "profile_context": profile_context
   }