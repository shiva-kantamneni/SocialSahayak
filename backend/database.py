from pymongo import MongoClient
from dotenv import load_dotenv
import os 

load_dotenv()

MONGO_URL=os.getenv("MONGO_URL")
DATABASE_NAME=os.getenv("DATABASE_NAME")

try:
    client=MongoClient(MONGO_URL)
    client.admin.command("ping")
    print("mongodb connected successfully")

    db=client[DATABASE_NAME]
    print("database",db.name)
except Exception as e:
    print("MOngo connection failed")
    print(e)

