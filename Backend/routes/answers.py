from fastapi import APIRouter,Depends, HTTPException
from fastapi.responses import JSONResponse
from pydantic import BaseModel, Field
from sqlmodel import Session, select
from db import get_session
from middleware.verify_users import verify_users
from models.answers import Answers
from models.questions import questions
router=APIRouter(prefix="/answers",tags=["answers"])
from fastapi.security import HTTPAuthorizationCredentials,HTTPBearer

security=HTTPBearer()
class ans(BaseModel):
    q_id:str
    user_name:str
    desc:str

@router.patch("/update/{id}")
async def update_ans(id:str,ans:dict,user=Depends(verify_users),credentials:HTTPAuthorizationCredentials=Depends(security),session:Session=Depends(get_session)):
    res=session.exec(select(Answers).where(Answers.answer_id==id )).one()
    res.desc=ans["ans"]
    session.add(res)
    session.commit()
    if not res:
        raise HTTPException(status_code=401,detail="not")
    return res


@router.get("/user")
async def get_user_answers(user=Depends(verify_users),credentials: HTTPAuthorizationCredentials = Depends(security),session:Session=Depends(get_session)):
    res=session.exec(select(Answers).where(Answers.answer_username==user["username"])).all()
    return res

@router.post("/create",response_model=ans)
async def create_answer(ans:dict,user=Depends(verify_users),session:Session=Depends(get_session)):
    print(ans,flush=True)
    newAns=Answers(user_id=user["user_id"],desc=ans["desc"],q_id=ans["q_id"],answer_username=user["username"])
    session.add(newAns)
    session.commit()
    print("added successfully",flush=True)
    printAns=ans(q_id=ans["q_id"],user_name=user["username"],desc=ans["desc"])
    return printAns

@router.get("/{id}")
async def get_allanswers(id:str,session:Session=Depends(get_session)):
    res=session.exec(select(Answers).where(Answers.q_id==id)).all()
    print(res,flush=True)
    return res
    
@router.delete("/delete/{id}")
async def delete_ans(id:str,user=Depends(verify_users),credentials: HTTPAuthorizationCredentials = Depends(security),session:Session=Depends(get_session)):
    answerInfo=session.exec(select(Answers).where(Answers.answer_id==id)).one()
    print("answer id:",answerInfo,flush=True)
    print(user)
    if user["user_id"]==answerInfo.user_id:
        session.delete(answerInfo)
        session.commit()
        print("deleted succesfully",flush=True)
    else:
        raise HTTPException(status_code=404,detail="not valid user")
    return "working"
    
