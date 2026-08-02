from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from ..database import get_db
from ..models.deficiency_report import DeficiencyReport
from .auth import get_current_user

router = APIRouter(
    prefix="/progress",
    tags=["Progress"]
)


@router.get("/")
def get_progress(
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

    total_deficiencies = len(deficiencies)

    health_score = max(
        100 - total_deficiencies * 15,
        40
    )

    history = [
        {"date": "Week 1", "score": 65},
        {"date": "Week 2", "score": 72},
        {"date": "Week 3", "score": 80},
        {"date": "Current", "score": health_score},
    ]

    nutrient_progress = []

    DEFAULT_TARGETS = {
        "Iron": 12,
        "Vitamin D": 30,
        "Vitamin B12": 300,
        "Calcium": 8.5,
        "Hemoglobin": 12,
    }

    for deficiency in deficiencies:

        target = (
            deficiency.reference_min
            if deficiency.reference_min is not None
            else DEFAULT_TARGETS.get(deficiency.nutrient_name, 100)
        )

        current = (
            deficiency.value
            if deficiency.value is not None
            else 0
        )

        nutrient_progress.append(
            {
                "nutrient": deficiency.nutrient_name,
                "current": current,
                "target": target,
            }
        )

    return {
        "health_score": health_score,
        "deficiencies_found": total_deficiencies,
        "improvement": 20,
        "history": history,
        "nutrient_progress": nutrient_progress,
    }