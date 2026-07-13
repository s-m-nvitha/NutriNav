from .auth import router as auth_router
from .health_profile import router as health_profile_router
from .medical_report import router as medical_report_router
from .deficiency_report import router as deficiency_report_router

__all__ = ["auth_router", "health_profile_router", "medical_report_router", "deficiency_report_router"]
