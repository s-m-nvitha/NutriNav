from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from ..database import get_db
from ..models import DeficiencyReport
from ..schemas import DeficiencyReportCreate, DeficiencyReportResponse
from .auth import get_current_user

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
