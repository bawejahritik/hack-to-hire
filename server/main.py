from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from server.router import flights_router, admin_router

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(flights_router.router, prefix="/flights")
app.include_router(admin_router.router, prefix="/admin")