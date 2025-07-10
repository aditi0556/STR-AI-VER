import traceback
from fastapi import APIRouter, HTTPException,status
from sqlmodel import Session, select
from models.Users import Users
from db import get_session
from fastapi import Depends

router = APIRouter(prefix="/users", tags=["users"])

@router.post("/add",response_model=Users)
def create_user(user: Users,session: Session = Depends(get_session)):
   
    try:
        result =session.exec(select(Users).where(Users.user_id==user.user_id)).all()
        if not result:
            session.add(user)
            print("successfull",flush=True)
            session.commit()
            return user
        else:
            raise HTTPException(status_code=500,detail="user already exists")

    except Exception as e:
        print("Error:", traceback.format_exc())
        print("meow",flush=True)
        raise HTTPException(status_code=500, detail=str(e))    
