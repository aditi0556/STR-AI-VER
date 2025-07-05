import traceback
from fastapi import APIRouter, HTTPException
from sqlmodel import Session, select
from ..models.Users import UserRead,Users
from ..db import get_session
from fastapi import Depends

router = APIRouter(prefix="/users", tags=["users"])

@router.post("/adduser", response_model=Users)
def create_user(user: UserRead,session: Session = Depends(get_session)):
   
    try:
        session.add(user)
        session.commit()
        print("commited",flush=True)
        session.refresh(user)
        return "aditi"
    except Exception as e:
        print("Error:", traceback.format_exc())
        print("meow",flush=True)
        raise HTTPException(status_code=500, detail=str(e))    
