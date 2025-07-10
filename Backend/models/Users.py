from pydantic import BaseModel
from sqlmodel import Field, SQLModel,Relationship
import uuid
from datetime import datetime
from typing import List,TYPE_CHECKING
if TYPE_CHECKING:
   from .questions import questions
   from .answers import Answers

class Users(SQLModel, table=True):
    __tablename__ = "Users"   
    username: str=Field(unique=True)
    user_id:str=Field(primary_key=True)
    created_at:datetime=Field(default_factory=datetime.now)
    updated_at:datetime=Field(default_factory=datetime.now)
    first_name:str|None=None
    last_name:str|None=None
    email:str|None=None
    question:List["questions"]=Relationship(back_populates="user")
    answer:List["Answers"]=Relationship(back_populates="user")


