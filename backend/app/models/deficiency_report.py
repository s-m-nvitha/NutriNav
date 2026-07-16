from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from ..database.base import Base


class DeficiencyReport(Base):
    __tablename__ = "deficiency_reports"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    nutrient_name = Column(String(100), nullable=False)
    value = Column(String(50), nullable=True)
    unit = Column(String(50), nullable=True)

    reference_min = Column(String(50), nullable=True)
    reference_max = Column(String(50), nullable=True)
    status = Column(String(50))  # normal, deficient, excessive
    severity = Column(String(20))  # mild, moderate, severe
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    user = relationship("User", backref="deficiency_reports")

    def __repr__(self):
        return f"<DeficiencyReport(id={self.id}, user_id={self.user_id}, nutrient_name={self.nutrient_name})>"
