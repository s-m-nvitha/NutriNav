from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from ..database import get_db
from ..models import HealthProfile
from ..schemas import HealthProfileCreate, HealthProfileResponse
from .auth import get_current_user

router = APIRouter(prefix="/health-profile", tags=["Health Profile"])


@router.post("/", response_model=HealthProfileResponse, status_code=status.HTTP_201_CREATED)
def create_health_profile(
    profile: HealthProfileCreate,
    current_user = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    db_profile = HealthProfile(user_id=current_user.id, **profile.model_dump())
    db.add(db_profile)
    db.commit()
    db.refresh(db_profile)
    return db_profile


@router.get("/", response_model=HealthProfileResponse)
def get_health_profile(
    current_user = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    profile = db.query(HealthProfile).filter(HealthProfile.user_id == current_user.id).first()
    if not profile:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Health profile not found"
        )
    return profile


@router.put("/", response_model=HealthProfileResponse)
def update_health_profile(
    profile: HealthProfileCreate,
    current_user = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    db_profile = db.query(HealthProfile).filter(HealthProfile.user_id == current_user.id).first()
    if not db_profile:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Health profile not found"
        )
    for key, value in profile.model_dump(exclude_unset=True).items():
        setattr(db_profile, key, value)
    db.commit()
    db.refresh(db_profile)
    return db_profile
