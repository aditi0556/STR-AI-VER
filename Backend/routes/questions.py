from datetime import datetime
from typing import List
from fastapi import APIRouter, Depends, HTTPException, Request
from pydantic import BaseModel, Field
from sqlmodel import Session, select
from middleware.verify_users import verify_users
from  db import get_session
from models.questions import questions
from fastapi.security import HTTPAuthorizationCredentials,HTTPBearer

router=APIRouter(prefix="/questions",tags=["questions"])
security=HTTPBearer()
class quest(BaseModel):
    user_name:str
    title:str
    q_desc:str
    created_at:datetime


@router.get("/getall")
async def get_all_questions(request:Request,session:Session=Depends(get_session))->list:
    result=session.exec(select(questions)).all()
    print("aditi",flush=True)
    print(request.headers.get("Authorization"),flush=True)
    return result

@router.get("/getall/{id}",response_model=questions)
async def get_desc(id:str, session:Session=Depends(get_session)):
    result=session.exec(select(questions).where(questions.q_id==id)).one_or_none()
    print(result,flush=True)
    if result==None:
        raise HTTPException(status_code=404,detail="question does not exist")
    return result

@router.get("/search")
async def get_search(q:str,session:Session=Depends(get_session))->List:
    result=session.exec(select(questions).where(questions.title==q)).all()
    if result==[]:
        raise HTTPException(status_code=204 ,detail="no result found")
    print(result,flush=True)
    return result

class newQs(BaseModel):
    title:str
    q_desc:str

@router.post("/add",response_model=questions)
async def add_question(data:newQs,user=Depends(verify_users),credentials: HTTPAuthorizationCredentials = Depends(security),session:Session=Depends(get_session)):
    quest=questions(title=data.title,q_desc=data.q_desc,user_name=user["username"],user_id=user["user_id"])
    session.add(quest)
    session.commit()
    return quest
