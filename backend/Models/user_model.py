from pydantic import BaseModel,EmailStr

class SignupModel(BaseModel):
    name:str
    email:EmailStr
    password:str


class SigninModel(BaseModel):
    email:EmailStr
    password:str

class ForgotPassword(BaseModel):
    email:str


