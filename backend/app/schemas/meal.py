from pydantic import BaseModel


class MealExplainRequest(BaseModel):
    food: str