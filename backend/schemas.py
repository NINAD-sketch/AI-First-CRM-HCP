from pydantic import BaseModel


class InteractionCreate(BaseModel):

    doctorName: str

    interactionType: str

    product: str

    notes: str

    followUp: str


class InteractionResponse(BaseModel):

    id: int

    doctorName: str

    interactionType: str

    product: str

    notes: str

    followUp: str

    class Config:
        from_attributes = True