from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from ..database.base import Base


class HealthProfile(Base):
    __tablename__ = "health_profiles"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)

    age = Column(Integer)
    gender = Column(String(20))
    height = Column(Integer)  # in cm
    weight = Column(Integer)  # in kg

    dietary_preference = Column(String(100))
    diseases = Column(String(500))
    allergies = Column(String(500))
    lifestyle = Column(String(100))

    activity_level = Column(String(50))
    goal = Column(String(100))

    work_type = Column(String(50))
    workout_type = Column(String(50))
    workout_timing = Column(String(50))

    hunger_pattern = Column(String(50))
    cravings = Column(String(50))

    sleep_duration = Column(String(50))
    stress_level = Column(String(50))

    meal_frequency = Column(String(50))
    water_intake = Column(String(50))

    budget_preference = Column(String(50))
    cooking_preference = Column(String(50))

    created_at = Column(DateTime(timezone=True), server_default=func.now())

    user = relationship("User", backref="health_profiles")

    def __repr__(self):
        return f"<HealthProfile(id={self.id}, user_id={self.user_id})>"