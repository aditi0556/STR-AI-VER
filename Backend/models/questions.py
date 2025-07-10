from sqlmodel import Field, SQLModel,Relationship
import uuid
from typing import Optional,List,TYPE_CHECKING
from datetime import datetime
if TYPE_CHECKING:
    from Users import Users
    from .answers import Answers
class questions(SQLModel, table=True):
    q_id: str=Field(primary_key=True,default_factory=lambda: str(uuid.uuid4()))
    title:str=Field(max_length=100)
    user_name: str
    user_id:str=Field(foreign_key="Users.user_id")
    created_at:datetime=Field(default_factory=datetime.now)
    q_desc:str=Field(max_length=500)
    answer:List["Answers"]=Relationship(back_populates="question",cascade_delete=True)
    user:Optional["Users"]=Relationship(back_populates="question")

