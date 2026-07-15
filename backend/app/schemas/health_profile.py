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

    activity_level: Optional[str] = None
    goal: Optional[str] = None

    work_type: Optional[str] = None
    workout_type: Optional[str] = None
    workout_timing: Optional[str] = None

    hunger_pattern: Optional[str] = None
    cravings: Optional[str] = None

    sleep_duration: Optional[str] = None
    stress_level: Optional[str] = None

    meal_frequency: Optional[str] = None
    water_intake: Optional[str] = None

    budget_preference: Optional[str] = None
    cooking_preference: Optional[str] = None


class HealthProfileCreate(HealthProfileBase):
    pass


class HealthProfileResponse(HealthProfileBase):
    id: int
    user_id: int
    created_at: datetime

    class Config:
        from_attributes = True
