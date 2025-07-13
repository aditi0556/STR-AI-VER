import time
from fastapi.responses import JSONResponse
import httpx
from fastapi import Request,status,HTTPException
from jwt import  PyJWKClient
from dotenv import load_dotenv
from jose import jwt,JWTError
import os

import jwt
load_dotenv()
CLERK_JWKS_URL = "https://renewed-herring-43.clerk.accounts.dev/.well-known/jwks.json"

CLERK_PUBLIC_KEY=os.getenv("CLERK_PUBLIC_KEY")
CLERK_API_URL=os.getenv("CLERK_API_URL")
# async def verify_clerk_token(token:str):
#     async with httpx.AsyncClient() as client:
#         res=await client.post(
#             f"{CLERK_API_URL}/tokens/verify",
#             headers={
#                 "Authorization":f"Bearer {CLERK_API_KEY}",
#                 "Content-Type": "application/json"
#             },
#             json={"token":token},
#         )
#         if res.status_code!=200:
        
#             raise HTTPException(status_code=404, detail="Not a valid token"
#             )
#         return res.json()

# async def verify_clerk_token(token:str):
#    try:
#         jwks_client = PyJWKClient(CLERK_JWKS_URL)
#         signing_key = jwks_client.get_signing_key_from_jwt(token)
#         payload = jwt.decode(
#             token,
#             signing_key.key,
#             algorithms=["RS256"],
#             audience=None,  
#             options={"verify_exp": True}
#         )
#         print(payload,flush=True)
#         return payload
#    except Exception as e:
#         raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail=f"Invalid token: {e}")
PERMITTED_ORIGINS = ["http://localhost:5173"] 
async def verify_clerk_token(token:str):
    try:
        decoded=jwt.decode(token,CLERK_PUBLIC_KEY,algorithms=["RS256"])
        current_time = int(time.time())
        print(decoded,flush=True)
        print("********",flush=True)
        if decoded.get("exp", 0) < current_time or decoded.get("nbf", 0) > current_time:
            raise JWTError("Token is expired or not yet valid")

        if decoded.get("azp")!="http://localhost:5173":
            raise JWTError("Invalid ")

        return decoded

    except JWTError as e:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,detail=f"Invalid token: {e}")
