from sqlalchemy.orm import Session

from .meal_context_service import get_user_meal_context

from ..models import (
    User,
    HealthProfile,
    DeficiencyReport,
    MedicalReport
)

from ..services.food_recommender import (
    get_food_recommendations
)


def get_user_context(
    db: Session,
    user: User
):

    health_profile = (
        db.query(HealthProfile)
        .filter(
            HealthProfile.user_id == user.id
        )
        .first()
    )

    deficiencies = (
        db.query(DeficiencyReport)
        .filter(
            DeficiencyReport.user_id == user.id
        )
        .all()
    )

    medical_reports = (
        db.query(MedicalReport)
        .filter(
            MedicalReport.user_id == user.id
        )
        .all()
    )

    food_recommendations = {}

    meal_context = get_user_meal_context(
        deficiencies,
        health_profile
    )

    context = {
        "user": {
            "name": user.full_name,
            "email": user.email
        },

        "health_profile": None,
        "deficiencies": [],
        "medical_reports": [],

        "food_recommendations": food_recommendations,
        "meal_plan": meal_context
    }

    if health_profile:

        context["health_profile"] = {
            "age": health_profile.age,
            "gender": health_profile.gender,
            "height": health_profile.height,
            "weight": health_profile.weight,

            "dietary_preference":
                health_profile.dietary_preference,

            "diseases":
                health_profile.diseases,

            "allergies":
                health_profile.allergies,

            "goal":
                health_profile.goal,

            "activity_level":
                health_profile.activity_level
        }

        food_recommendations = get_food_recommendations(
            deficiencies,
            health_profile
        )

        context["food_recommendations"] = food_recommendations

    for item in deficiencies:

        context["deficiencies"].append(
            {
                "nutrient": item.nutrient_name,
                "value": item.value,
                "status": item.status,
                "severity": item.severity
            }
        )

    for report in medical_reports:

        context["medical_reports"].append(
            {
                "file_name": report.file_name,
                "text": report.extracted_text
            }
        )

    return context