from fastapi import APIRouter,Depends
from pydantic import BaseModel
from rag.rag import generate_content
from database import db
from typing import Optional
from bson import ObjectId
from datetime import datetime
from utils.auth import get_current_user

router=APIRouter()
class PromptRequest(BaseModel):
    prompt:str
    chat_id:Optional[str]=None

chat_collection=db["chats"]

@router.post("/generate")
def generate(req:PromptRequest,current_user=Depends(get_current_user)):
    result=generate_content(req.prompt)
    if req.chat_id is None:
        chat={
            "user_id":current_user["user_id"],
            "title":req.prompt[:40],
            "messages":[{
                "role":"user",
                "content":req.prompt,
                "time":datetime.utcnow()
            },{
                "role":"assistant",
                "content":result,
                "time":datetime.utcnow()
            }],
            "created_at":datetime.utcnow(),
            "updated_at":datetime.utcnow()
        }
        inserted=chat_collection.insert_one(chat)
        return {
            "chat_id":str(inserted.inserted_id),
            "response":result
        }
    chat_collection.update_one(
        {
            "_id":ObjectId(req.chat_id)
        },
        {
            "$push":{
                "messages":{
                    "$each":[
                        {
                            "role":"user",
                            "content":req.prompt,
                            "time":datetime.utcnow()
                        },
                        {
                            "role":"assistant",
                            "content":result,
                            "time":datetime.utcnow()
                        }
                    ]
                }
            },
            "$set":{
                "updated_at":datetime.utcnow()
            }
        }
    )
    return {
        "chat_id":req.chat_id,
        "response":result
    }


@router.get("/history")
def get_history(current_user=Depends(get_current_user)):
    chats=list(
        chat_collection.find(
            {
                "user_id":current_user["user_id"]
            },
            {
                "title":1,
                "updated_at":1,
            }
        ).sort("updated_at",-1)
    )
    for chat in chats:
        chat["_id"]=str(chat["_id"])
    return chats

@router.get("/history/{chat_id}")
def get_chat(
    chat_id:str,
    current_user=Depends(get_current_user)
):
    chat=chat_collection.find_one({
        "_id":ObjectId(chat_id),
        "user_id":current_user["user_id"]
    })
    if not chat:
        return {"message":"chat not found"}
    chat["_id"]=str(chat["_id"])
    return chat