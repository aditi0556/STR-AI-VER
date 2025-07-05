from sqlmodel import create_engine,SQLModel,Session
engine=create_engine(
    "postgresql://postgres:Aditisinhaismyname@db.ysgecsvqwimrbfmrfwug.supabase.co:5432/postgres",
    echo=True
    )
def create_db_and_tables():
    SQLModel.metadata.create_all(engine)

def get_session():
    with Session(engine) as session:
        yield session