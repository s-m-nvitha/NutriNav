from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import chat
from fastapi.middleware.cors import CORSMiddleware


from .database import engine, Base

from .routes import (
    auth_router,
    health_profile_router,
    medical_report_router,
    deficiency_report_router
)

from .routes import meal_plans
from .routes import progress

Base.metadata.create_all(bind=engine)


app = FastAPI(
    title="NutriNav API",
    version="1.0.0"
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:3000"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(auth_router)
app.include_router(health_profile_router)
app.include_router(medical_report_router)
app.include_router(deficiency_report_router)
app.include_router(meal_plans.router)
app.include_router(chat.router)
app.include_router(progress.router)


@app.get("/")
def root():
    return {
        "message": "NutriNav API - AI Powered Personalized Nutrition Guide"
    }


@app.get("/health")
def health_check():
    return {
        "status": "healthy"
    }