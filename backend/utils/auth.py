from fastapi import Header,HTTPException
from jose import jwt

from dotenv import load_dotenv
import os

load_dotenv()

SEC_KEY=os.getenv("SECRET_KEY")
Algo=os.getenv("ALGORITHM")

def get_current_user(authorization:str=Header(None)):

    if not authorization:
        raise HTTPException(status_code=401,detail="token missing")
    token=authorization.split(" ")[1]
    try:
        payload=jwt.decode(token,SEC_KEY,Algo)
        return payload
    except:
        raise HTTPException(status_code=401,detail="Invalid token")

