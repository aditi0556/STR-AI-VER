from fastapi import APIRouter
from pydantic import BaseModel
from ..models.questions import questions

router=APIRouter("/questions",tags=["questions"])
    
# @router.get("/getallquestions",response_model=questions)
# async def get_all_functions()