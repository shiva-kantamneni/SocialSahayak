from fastapi import APIRouter, HTTPException
from database import db

from Models.user_model import SigninModel,SignupModel

from utils.security import hash_password,verify_password
user_collection=db["users"]
router=APIRouter()

@router.post("/signup")
def signup(user:SignupModel):
    existing_user=users_collection.findOne({})