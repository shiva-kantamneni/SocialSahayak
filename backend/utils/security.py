import bcrypt

def hash_password(password:str):
    salt=bcrypt.gensalt()
    return bcrypt.hashpw(password.encode('utf-8'),salt)

def verify_password(password:str,hashed_password:bytes):
    return bcrypt.checkpw(password.encode('utf-8'),hashed_password)

