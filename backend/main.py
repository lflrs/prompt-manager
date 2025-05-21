from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from sqlalchemy.orm import Session
from typing import List
import models, database, ollama_client

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

models.Base.metadata.create_all(bind=database.engine)

class PromptCreate(BaseModel):
    prompt: str

class PromptResponse(BaseModel):
    id: int
    prompt: str
    response: str

@app.post("/prompts/", response_model=PromptResponse)
def create_prompt(prompt_in: PromptCreate, db: Session = Depends(database.get_db)):
    response = ollama_client.ask_ollama(prompt_in.prompt)
    db_prompt = models.Prompt(prompt=prompt_in.prompt, response=response)
    db.add(db_prompt)
    db.commit()
    db.refresh(db_prompt)
    return PromptResponse(id=db_prompt.id, prompt=db_prompt.prompt, response=db_prompt.response)

@app.get("/prompts/", response_model=List[PromptResponse])
def get_prompts(db: Session = Depends(database.get_db)):
    prompts = db.query(models.Prompt).order_by(models.Prompt.id.desc()).all()
    return [PromptResponse(id=p.id, prompt=p.prompt, response=p.response) for p in prompts]