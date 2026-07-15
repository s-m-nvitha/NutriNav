from pydantic import BaseModel
from datetime import datetime
from typing import Optional


class MedicalReportBase(BaseModel):
    file_name: str


class MedicalReportCreate(MedicalReportBase):
    pass


class MedicalReportResponse(MedicalReportBase):
    id: int
    user_id: int
    file_path: str
    upload_date: datetime
    extracted_text: Optional[str] = None

    class Config:
        from_attributes = True
