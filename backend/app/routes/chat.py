from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from ..database import get_db
from ..models import User
from .auth import get_current_user

from ..schemas.chat import ChatRequest
from ..services.user_context_service import get_user_context
from ..services.ai_service import generate_nutrition_response
from ..services.chat_service import (
    save_chat_message,
    get_chat_history
)
from ..models.chat_message import ChatMessage


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

    chat_history = get_chat_history(
        db,
        current_user.id
    )

    ai_response = generate_nutrition_response(
        context,
        chat_history,
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


@router.get("/history")
async def get_history(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):

    chats = (
        db.query(ChatMessage)
        .filter(ChatMessage.user_id == current_user.id)
        .order_by(ChatMessage.created_at.asc())
        .all()
    )

    history = []

    for chat in chats:
        history.append({
            "message": chat.message,
            "response": chat.response,
            "created_at": chat.created_at
        })

    return history