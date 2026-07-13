from pydantic import BaseModel
from datetime import datetime
from typing import Optional


class HealthProfileBase(BaseModel):
    age: Optional[int] = None
    gender: Optional[str] = None
    height: Optional[int] = None
    weight: Optional[int] = None
    dietary_preference: Optional[str] = None
    diseases: Optional[str] = None
    allergies: Optional[str] = None
    lifestyle: Optional[str] = None


class HealthProfileCreate(HealthProfileBase):
    pass


class HealthProfileResponse(HealthProfileBase):
    id: int
    user_id: int
    created_at: datetime

    class Config:
        from_attributes = True
