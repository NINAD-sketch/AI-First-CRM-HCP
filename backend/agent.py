import os
from dotenv import load_dotenv

from langchain_groq import ChatGroq

load_dotenv()

llm = ChatGroq(
    model="llama-3.3-70b-versatile",
    api_key=os.getenv("GROQ_API_KEY"),
    temperature=0,
)

# --------- Tool Functions ---------

def log_interaction(interaction):
    return f"Interaction logged:\n{interaction}"

def edit_interaction(interaction):
    return f"Interaction updated:\n{interaction}"

def search_hcp(name):
    return f"HCP Found: {name}"

def interaction_history(name):
    return f"Previous interactions for {name}"

def create_followup(task):
    return f"Follow-up created: {task}"