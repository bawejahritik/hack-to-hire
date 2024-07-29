from pydantic import BaseModel
from typing import List, Optional

class Flight(BaseModel):
  flight_id: str
  airline: str
  status: str
  departure_gate: str
  arrival_gate: str
  scheduled_departure: str
  scheduled_arrival: str
  actual_departure: Optional[str] = None
  actual_arrival: Optional[str] = None
  
class Update_Flight(BaseModel):
  flight_id: Optional[str] = None
  airline: Optional[str] = None
  status: Optional[str] = None
  departure_gate: Optional[str] = None
  arrival_gate: Optional[str] = None
  scheduled_departure: Optional[str] = None
  scheduled_arrival: Optional[str] = None
  actual_departure: Optional[str] = None
  actual_arrival: Optional[str] = None
  type: str

class Flights(BaseModel):
  data: List[Flight]
    
class BookFlight(BaseModel):
  email: str