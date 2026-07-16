from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from ..database import get_db
from ..models import DeficiencyReport, HealthProfile
from ..schemas import DeficiencyReportCreate, DeficiencyReportResponse
from .auth import get_current_user
from app.services.food_recommender import get_food_recommendations
from app.services.ai_explainer import generate_explanation

router = APIRouter(prefix="/deficiency-reports", tags=["Deficiency Reports"])


@router.post("/", response_model=DeficiencyReportResponse, status_code=status.HTTP_201_CREATED)
def create_deficiency_report(
    report: DeficiencyReportCreate,
    current_user = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    db_report = DeficiencyReport(user_id=current_user.id, **report.model_dump())
    db.add(db_report)
    db.commit()
    db.refresh(db_report)
    return db_report


@router.get("/", response_model=list[DeficiencyReportResponse])
def get_deficiency_reports(
    current_user = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    reports = db.query(DeficiencyReport).filter(DeficiencyReport.user_id == current_user.id).all()
    return reports

@router.get("/recommendations")
def get_recommendations(
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


    food_recommendations = get_food_recommendations(
        deficiencies,
        profile
    )


    deficiency_data = []

    for item in deficiencies:
        deficiency_data.append({
            "nutrient": item.nutrient_name,
            "value": item.value,
            "unit": item.unit,
            "severity": item.severity
        })


    explanations = generate_explanation(
        deficiency_data,
        profile
    )


    return {
        "deficiencies": explanations["deficiencies"],
        "profile_context": explanations["profile_context"],
        "food_recommendations": food_recommendations
    }