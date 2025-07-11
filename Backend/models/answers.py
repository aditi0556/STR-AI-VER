from sqlmodel import SQLModel,Field,Relationship
from typing import Optional,TYPE_CHECKING
import uuid
if TYPE_CHECKING:
   from .Users import Users
   from .questions import questions

class Answers(SQLModel,table=True):
    answer_id: str = Field(default_factory=lambda: str(uuid.uuid4()), primary_key=True)
    user_id:str=Field(foreign_key="Users.user_id")
    desc:str
    answer_username:str
    q_id:str=Field(foreign_key="questions.q_id",ondelete="CASCADE")
    user:Optional["Users"]=Relationship(back_populates="answer")
    question:Optional["questions"]=Relationship(back_populates="answer")