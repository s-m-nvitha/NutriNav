from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from ..database import get_db
from ..models import User
from .auth import get_current_user

from ..schemas.chat import ChatRequest
from ..services.user_context_service import get_user_context
from ..services.ai_service import generate_nutrition_response
from ..services.chat_service import save_chat_message


router = APIRouter(
    prefix="/chat",
    tags=["Chat"]
)


@router.post("/")
async def chat(
    request: ChatRequest,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):

    context = get_user_context(
        db,
        current_user
    )

    ai_response = generate_nutrition_response(
        context,
        request.message
    )

    save_chat_message(
        db=db,
        user_id=current_user.id,
        message=request.message,
        response=ai_response
    )

    return {
        "response": ai_response
    }