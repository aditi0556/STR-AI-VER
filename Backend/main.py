import traceback
from clerk_backend_api import Clerk
from fastapi import FastAPI, HTTPException,Request,Depends
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from pydantic import BaseModel, Field
from sqlmodel import SQLModel,Session,select
from db import create_db_and_tables,get_session
from models import questions
from contextlib import asynccontextmanager
from db import engine
from models.Users import Users  
from models import answers
from fastapi.middleware.cors import CORSMiddleware
import logging
logger = logging.getLogger("uvicorn.error")

@asynccontextmanager
async def lifespan(app: FastAPI):
    create_db_and_tables()
    yield

app = FastAPI(lifespan=lifespan)

origin=[
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origin,
    allow_headers=["*"],
    allow_methods=["*"],
)
clerk_client=Clerk(bearer_auth="sk_test_uzkaZm7goNKozy7wWtzIfejQg2ucUZzvPcmPLlbuLf")

# app.mount("/Static", StaticFiles(directory="Static"), name="Style.css")
templates = Jinja2Templates(directory="templates")


@app.get("/home",response_class=HTMLResponse)
async def get_user(request:Request):
    return templates.TemplateResponse(
        request=request,
        name="discuss.html"
    )

# @app.post("/getquestion")
