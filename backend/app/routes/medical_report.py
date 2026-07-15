from fastapi import APIRouter, Depends, HTTPException, status, UploadFile, File
from sqlalchemy.orm import Session
from ..database import get_db
from ..schemas import MedicalReportResponse
from .auth import get_current_user
import os
from datetime import datetime
from ..services.pdf_extractor import extract_text_from_pdf
from ..services.deficiency_analyzer import analyze_deficiencies
from ..models import MedicalReport, DeficiencyReport

router = APIRouter(prefix="/medical-reports", tags=["Medical Reports"])

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)


@router.post("/upload", response_model=MedicalReportResponse, status_code=status.HTTP_201_CREATED)
async def upload_medical_report(
    file: UploadFile = File(...),
    current_user = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    file_name = f"{current_user.id}_{timestamp}_{file.filename}"
    file_path = os.path.join(UPLOAD_DIR, file_name)

    with open(file_path, "wb") as buffer:
        content = await file.read()
        buffer.write(content)

    extracted_text = ""
    deficiencies = []

    if file.filename.lower().endswith(".pdf"):
        extracted_text = extract_text_from_pdf(file_path)
        deficiencies = analyze_deficiencies(extracted_text)

        db_report = MedicalReport(
        user_id=current_user.id,
        file_name=file.filename,
        file_path=file_path,
        extracted_text=extracted_text
    )

    db.add(db_report)
    db.commit()
    db.refresh(db_report)


    # Delete previous deficiency reports
    db.query(DeficiencyReport).filter(
        DeficiencyReport.user_id == current_user.id
    ).delete()


    # Save latest deficiency analysis
    for deficiency in deficiencies:

        db_deficiency = DeficiencyReport(
            user_id=current_user.id,
            nutrient_name=deficiency,
            status="deficient",
            severity="moderate"
        )

        db.add(db_deficiency)


    db.commit()
    db.refresh(db_report)


    # Delete previous deficiency analysis for this user
    db.query(DeficiencyReport).filter(
        DeficiencyReport.user_id == current_user.id
    ).delete()


    # Save latest deficiency analysis
    for deficiency in deficiencies:

        db_deficiency = DeficiencyReport(
            user_id=current_user.id,
            nutrient_name=deficiency,
            status="deficient",
            severity="moderate"
        )

        db.add(db_deficiency)


    db.commit()


    return {
        "id": db_report.id,
        "user_id": db_report.user_id,
        "file_name": db_report.file_name,
        "file_path": db_report.file_path,
        "upload_date": db_report.upload_date,
        "extracted_text": extracted_text
    }

@router.get("/", response_model=list[MedicalReportResponse])
def get_medical_reports(
    current_user = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    reports = db.query(MedicalReport).filter(MedicalReport.user_id == current_user.id).all()
    return reports
