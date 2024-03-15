from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from pydantic import BaseModel
from passlib.context import CryptContext
import jwt
import re
import pandas as pd
import requests
import openai
import numpy as np

app = FastAPI()

openai.api_key = ""
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)

MONGODB_URL = "mongodb://localhost:27017"
DATABASE_NAME = "Brain_Tumor_Detection"

SECRET_KEY = "secret"
ALGORITHM = "HS256"

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def get_mongo_connection():
    client = AsyncIOMotorClient(MONGODB_URL)
    return client

async def initialize_database():
    client = get_mongo_connection()
    db = client[DATABASE_NAME]
    if "users" not in await db.list_collection_names():
        await db.create_collection("users")

    if "hospitals" not in await db.list_collection_names():
        df = pd.read_csv('spitale_updated.csv')
        hospitals_collection = db["hospitals"]
        await hospitals_collection.insert_many(df.to_dict(orient='records'))

# @app.on_event("startup")
# async def startup_event():
#     await initialize_database()

class User(BaseModel):
    username: str
    email: str
    password: str

class UserInDB(BaseModel):
    username: str
    email: str
    hashed_password: str

def get_user_collection():
    client = get_mongo_connection()
    return client[DATABASE_NAME]["users"]

async def get_user(identifier: str):
    user_collection = get_user_collection()
    user_dict = await user_collection.find_one({"$or": [{"username": identifier}, {"email": identifier}]}, {"_id": 0, "username": 1, "email": 1, "hashed_password": 1})
    if user_dict:
        return UserInDB(**user_dict)

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password):
    return pwd_context.hash(password)

def create_access_token(data: dict):
    encoded_jwt = jwt.encode(data, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

register_enabled = True
login_enabled = True

def is_valid_email(email: str):
    pattern = r"^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$"
    return bool(re.match(pattern, email))

class UserLogin(BaseModel):
    email: str
    password: str

@app.post("/register/")
async def register(user: User):
    if not register_enabled:
        raise HTTPException(status_code=403, detail="Registration is disabled")
        
    if not is_valid_email(user.email):
        raise HTTPException(status_code=400, detail="Invalid email format")

    user_collection = get_user_collection()
    existing_user = await user_collection.find_one({"$or": [{"username": user.username}, {"email": user.email}]})
    if existing_user:
        raise HTTPException(status_code=400, detail="Username or email already registered")

    hashed_password = get_password_hash(user.password)
    await user_collection.insert_one({"username": user.username, "email": user.email, "hashed_password": hashed_password})
    return {"message": "User registered successfully"}

@app.post("/login/")
async def login(user: UserLogin):
    if not login_enabled:
        raise HTTPException(status_code=403, detail="Login is disabled")
        
    db_user = await get_user(user.email)
    if not db_user or not verify_password(user.password, db_user.hashed_password):
        raise HTTPException(status_code=401, detail="Invalid email or password")

    access_token = create_access_token(data={"sub": db_user.username})
    return {"access_token": access_token}