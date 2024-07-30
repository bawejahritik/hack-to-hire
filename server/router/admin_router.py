from fastapi import APIRouter

from server.models.flight_model import Flight, Update_Flight, Flights
from server.database import flights

import pika
import json

router = APIRouter()

def publish_to_queue(email_details):
    connection = pika.BlockingConnection(pika.ConnectionParameters('localhost'))
    channel = connection.channel()
    channel.queue_declare(queue='email_queue')
    channel.basic_publish(
        exchange='',
        routing_key='email_queue',
        body=json.dumps(email_details)
    )
    connection.close()

@router.get("/")
async def get_flights():
    data = await flights.get_flights()
    return Flights(data = data)

@router.post("/createFlight")
async def create_flight(req_body: Flight):
    body = req_body.dict(by_alias=True)
    flight_id = await flights.create_flight(body)
    print(flight_id)
    return {"id": str(flight_id)}

@router.patch("/updateFlight/{flight_id}")
async def update_flight(flight_id: str, req_body: Update_Flight):
    print(req_body)
    body = req_body.dict(by_alias=True)
    new_body = {}
    for key in body.keys():
        if body[key] != None and key != "type":
            new_body[key] = body[key]
    result = await flights.update_flight(flight_id, new_body)
    emails = await flights.get_emails(flight_id)
    emails = emails[0]["passengers"]
    email_details = {}
    if body["type"] == "gate_change":
        for email in emails:
            email_details = {'to': email, 'subject': "Flight Update", 'body': f"Your gate has been changed to {body["departure_gate"]}"}
            publish_to_queue(email_details)
    elif body["type"] == "delay":
        for email in emails:
            email_details = {'to': email, 'subject': "Flight Update", 'body': f"Your flight is delayed. New departure time is {body["scheduled_departure"]}"}
            # publish_to_queue(email_details)
    elif body["type"] == "cancellation":
        for email in emails:
            email_details = {'to': email, 'subject': "Flight Update", 'body': f"Your flight is Cancelled."}       
            publish_to_queue(email_details)
    
    return {"id": str(flight_id)}