from pydantic import BaseModel
from datetime import datetime


class DeficiencyReportBase(BaseModel):
    nutrient_name: str

    value: str | None = None
    unit: str | None = None

    reference_min: str | None = None
    reference_max: str | None = None

    status: str
    severity: str


class DeficiencyReportCreate(DeficiencyReportBase):
    pass


class DeficiencyReportResponse(DeficiencyReportBase):
    id: int
    user_id: int
    created_at: datetime

    class Config:
        from_attributes = True
