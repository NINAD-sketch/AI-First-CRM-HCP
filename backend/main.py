from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

from database import Base, engine, get_db
from models import Interaction
from schemas import InteractionCreate

from agent import (
    llm,
    log_interaction,
    edit_interaction,
    search_hcp,
    interaction_history,
    create_followup,
)

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="AI-First CRM API",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def home():
    return {
        "message": "AI-First CRM Backend Running Successfully!"
    }


@app.get("/health")
def health():
    return {
        "status": "ok"
    }


@app.post("/log-interaction")
def save_interaction(
    data: InteractionCreate,
    db: Session = Depends(get_db),
):

    interaction = Interaction(
        doctor_name=data.doctorName,
        interaction_type=data.interactionType,
        product=data.product,
        notes=data.notes,
        follow_up=data.followUp,
    )

    db.add(interaction)
    db.commit()
    db.refresh(interaction)

    interaction_text = f"""
Doctor: {data.doctorName}
Interaction Type: {data.interactionType}
Product: {data.product}
Notes: {data.notes}
Follow Up: {data.followUp}
"""

    tool_output = log_interaction(interaction_text)

    ai = llm.invoke(
        f"""
You are an AI CRM assistant.

Summarize this interaction professionally.

{interaction_text}
"""
    )

    return {
        "message": "Interaction Logged Successfully!",
        "database_id": interaction.id,
        "tool_output": tool_output,
        "summary": ai.content,
    }


@app.get("/interactions")
def get_interactions(db: Session = Depends(get_db)):
    return db.query(Interaction).all()


class ChatRequest(InteractionCreate):
    message: str = ""


@app.post("/chat")
def chat(request: dict):

    message = request["message"].lower()

    if "history" in message:
        return {
            "response": interaction_history(message)
        }

    if "search" in message:
        return {
            "response": search_hcp(message)
        }

    if "follow" in message:
        return {
            "response": create_followup(message)
        }

    if "edit" in message:
        return {
            "response": edit_interaction(message)
        }

    response = llm.invoke(message)

    return {
        "response": response.content
    }
