from jose import jwt 
from datetime import datetime,timedelta
import os 
from dotenv import load_dotenv

load_dotenv()

Sec_Key=os.getenv("SECRET_KEY")
Algo=os.getenv("ALGORITHM")

def create_token(data:dict):
    to_encode=data.copy()
    expire=datetime.utcnow()+timedelta(minutes=30)
    to_encode.update({"exp":expire})
    return jwt.encode(to_encode,Sec_Key,algorithm=Algo)

