from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional

app = FastAPI(title="ContentDNA API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class SampleInput(BaseModel):
    samples: List[str]

class Fingerprint(BaseModel):
    tone: str
    formality: int
    preferred_words: List[str]
    sentence_style: str
    pov: str

class ContentDraft(BaseModel):
    fingerprint: Fingerprint
    draft: str

class AnalysisResult(BaseModel):
    score: int
    suggestions: List[str]
    feedback: str

@app.get("/")
def read_root():
    return {"message": "Welcome to ContentDNA API"}

@app.post("/api/fingerprint", response_model=Fingerprint)
def generate_fingerprint(data: SampleInput):
    # Mock generation of fingerprint
    # In a real app, this would call GPT/Claude
    return Fingerprint(
        tone="conversational",
        formality=6,
        preferred_words=["discover", "unlock", "growth"],
        sentence_style="short",
        pov="second_person"
    )

@app.post("/api/check", response_model=AnalysisResult)
def check_content(data: ContentDraft):
    # Mock content checking
    return AnalysisResult(
        score=58,
        suggestions=["We're excited to share our latest product."],
        feedback="Too formal. Avoid using 'hereby'."
    )
