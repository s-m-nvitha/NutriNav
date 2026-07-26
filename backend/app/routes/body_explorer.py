from fastapi import APIRouter

from app.data.body_mapping import BODY_MAP

router = APIRouter(
    prefix="/body-explorer",
    tags=["Body Explorer"]
)


@router.get("/{organ}")
async def get_organ_info(organ: str):

    organ = organ.lower()

    if organ not in BODY_MAP:
        return {
            "error": "Organ not found"
        }

    return BODY_MAP[organ]