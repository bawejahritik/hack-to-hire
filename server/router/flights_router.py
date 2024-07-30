from fastapi import APIRouter
from server.database import flights
from server.models.flight_model import Flights, Flight, BookFlight, FetchFlight

router = APIRouter()

@router.get("/{flight_id}")
async def fetch_flight(flight_id: str):
    data = await flights.fetch_flight(flight_id=flight_id)
    data = data[0]
    data.pop("_id")
    data.pop("passengers")
    if data.get("type", None):
        data.pop("type")
    return FetchFlight(data=data)

@router.post("/book_flight/{flight_id}")
async def book_flight(flight_id:str, req_body: BookFlight):
    body = req_body.dict(by_alias=True)
    result = await flights.book_flight(flight_id=flight_id, email=body["email"])
    return "flight booked"