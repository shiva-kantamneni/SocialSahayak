from fastapi import APIRouter, HTTPException
from database import db
from utils.security import hash_password,verify_password

from Models.user_model import SigninModel,SignupModel

from utils.security import hash_password,verify_password
user_collection=db["users"]
router=APIRouter()

@router.post("/signup")
def signup(user:SignupModel):
    existing_user=user_collection.find_one({"email":user.email})
    if existing_user:
        return {"message":"user Already exists"}
    user_collection.insert_one({
        "name":user.name,
        "email":user.email,
        "password":hash_password(user.password)
    })
    return {"message":"User created successfully"}

@router.post("/signin")
def signin(user:SigninModel):
    existing_user=user_collection.find_one({"email":user.email})
    if not existing_user:
        return {"message":"user Not Found"}
    if not verify_password(user.password,existing_user["password"]):
        return {"message":"Invalid Password"}
    return {"message":"login successful"}

    

@router.get("/")
def home():
    return {"message":"Api is running"}