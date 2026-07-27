from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from ..database import get_db
from ..models import DeficiencyReport, HealthProfile
from .auth import get_current_user

from app.services.meal_planner import get_meal_plan
from app.services.meal_explainer_ai import explain_meal_with_ai
from ..schemas.meal import MealExplainRequest
from app.services.meal_explainer import find_food_reason


router = APIRouter(
    prefix="/meal-plans",
    tags=["Meal Planner"]
)


@router.get("/")
def generate_meal_plan(
    current_user=Depends(get_current_user),
    db: Session = Depends(get_db)
):

    # Get user's deficiencies
    deficiencies = (
        db.query(DeficiencyReport)
        .filter(
            DeficiencyReport.user_id == current_user.id
        )
        .all()
    )


    # Get user's health profile
    profile = (
        db.query(HealthProfile)
        .filter(
            HealthProfile.user_id == current_user.id
        )
        .first()
    )


    meal_plan = get_meal_plan(
        deficiencies,
        profile
    )


    personalization = []


    # Add deficiencies
    for deficiency in deficiencies:
        personalization.append(
            deficiency.nutrient_name + " deficiency"
        )


    # Add profile details
    if profile:

        if profile.dietary_preference:
            personalization.append(
                profile.dietary_preference
            )


        if profile.diseases:
            personalization.append(
                profile.diseases
            )


        if profile.allergies:
            personalization.append(
                profile.allergies + " allergy"
            )


    return {
        "personalization": personalization,
        "meal_plan": meal_plan
    }

@router.post("/explain")
def explain_meal(
    request: MealExplainRequest,
    current_user=Depends(get_current_user),
    db: Session = Depends(get_db)
):

    deficiencies = (
        db.query(DeficiencyReport)
        .filter(
            DeficiencyReport.user_id == current_user.id
        )
        .all()
    )


    profile = (
        db.query(HealthProfile)
        .filter(
            HealthProfile.user_id == current_user.id
        )
        .first()
    )


    meal_plan = get_meal_plan(
        deficiencies,
        profile
    )


    explanation = explain_meal_with_ai(
        request.food,
        deficiencies,
        profile
   )


    return {
        "food": request.food,
        "explanation": explanation
    }