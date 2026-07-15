from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from ..database.base import Base
from sqlalchemy import Text


class MedicalReport(Base):
    __tablename__ = "medical_reports"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    file_name = Column(String(255), nullable=False)
    file_path = Column(String(500), nullable=False)
    upload_date = Column(DateTime(timezone=True), server_default=func.now())
    extracted_text = Column(Text, nullable=True)

    user = relationship("User", backref="medical_reports")

    def __repr__(self):
        return f"<MedicalReport(id={self.id}, user_id={self.user_id}, file_name={self.file_name})>"
