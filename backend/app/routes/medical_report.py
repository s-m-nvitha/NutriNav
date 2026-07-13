from fastapi import APIRouter, Depends, HTTPException, status, UploadFile, File
from sqlalchemy.orm import Session
from ..database import get_db
from ..models import MedicalReport
from ..schemas import MedicalReportResponse
from .auth import get_current_user
import os
from datetime import datetime

router = APIRouter(prefix="/medical-reports", tags=["Medical Reports"])

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)


@router.post("/upload", response_model=MedicalReportResponse, status_code=status.HTTP_201_CREATED)
async def upload_medical_report(
    file: UploadFile = File(...),
    current_user = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    file_extension = file.filename.split(".")[-1]
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    file_name = f"{current_user.id}_{timestamp}_{file.filename}"
    file_path = os.path.join(UPLOAD_DIR, file_name)
    
    with open(file_path, "wb") as buffer:
        content = await file.read()
        buffer.write(content)
    
    db_report = MedicalReport(
        user_id=current_user.id,
        file_name=file.filename,
        file_path=file_path
    )
    db.add(db_report)
    db.commit()
    db.refresh(db_report)
    return db_report


@router.get("/", response_model=list[MedicalReportResponse])
def get_medical_reports(
    current_user = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    reports = db.query(MedicalReport).filter(MedicalReport.user_id == current_user.id).all()
    return reports
