from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from ..database import get_db
from ..models import DeficiencyReport, HealthProfile
from .auth import get_current_user

from app.services.meal_planner import get_meal_plan


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


    return {
        "meal_plan": meal_plan
    }