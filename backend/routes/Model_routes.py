from fastapi import APIRouter
from pydantic import BaseModel
from rag.rag import generate_content


router=APIRouter()
class PromptRequest(BaseModel):
    prompt:str

@router.post("/generate")
def generate(req:PromptRequest):

    result=generate_content(req.prompt)
    return {"response":result}