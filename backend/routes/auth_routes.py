from fastapi import APIRouter, HTTPException,Depends
from utils.auth import get_current_user
from bson import ObjectId

from database import db
from utils.security import hash_password,verify_password
from utils.jwt_handler import create_token

from Models.user_model import SigninModel,SignupModel,ForgotPassword

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
        raise HTTPException(status_code=404,detail="user not found")
    
    if not verify_password(user.password,existing_user["password"]):
       raise HTTPException(status_code=401,detail="password not matched")
    token=create_token({"email":existing_user["email"],"user_id":str(existing_user["_id"])})
    return {"message":"login successful","token":token}

@router.get("/me")
def get_profile(current_user=Depends(get_current_user)):
    user=user_collection.find_one({
        "_id":ObjectId(current_user["user_id"])
    })
    return {
        "name":user["name"],
        "email":user["email"]
    }


@router.post("/forgot-password")
def forgot_password(data:ForgotPassword):
    user=user_collection.find_one({
        "email":req.email
    })
    if not user:
        raise HTTPException(
            status_code=404,
            detail="Email Not Found"
        )
    return{
        "message":"Email Verified"
    }
    

@router.get("/")
def home():
    return {"message":"Api is running"}