from fastapi import HTTPException, Request,status
from .verify_clerk_token import verify_clerk_token

async def verify_users(request:Request):
    res=request.headers.get("Authorization")
    if not res or not res.startswith("Bearer "):
        raise HTTPException(status_code=401,detail="Missing Token")
    token=res.split(" ")[1]
    print(token,flush=True)
    user=await verify_clerk_token(token)
    return user