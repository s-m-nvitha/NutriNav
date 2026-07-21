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

    return {
        "health_score": health_score,
        "deficiencies_found": total_deficiencies,
        "improvement": 0
    }