import motor.motor_asyncio
from dotenv import load_dotenv
import os

load_dotenv()

uri = os.getenv("MONGODB_URI")
client = motor.motor_asyncio.AsyncIOMotorClient(uri)

db = client["Aviation"]

flight_collection = db.get_collection("Flights")
notification_collection = db.get_collection("Notifications")

async def get_flights():
    result = await flight_collection.find().to_list(None)
    print(type(result))
    if result:
        return result
    else: 
        return [] 

async def fetch_flight(flight_id):
    result = await flight_collection.find_one({"flight_id": flight_id})
    
    if result:
        return [result]
    return []

async def create_flight(body):
    result = await flight_collection.insert_one(body)
    return result.inserted_id

async def update_flight(flight_id, body):
    result = await flight_collection.find_one_and_update({"flight_id": flight_id}, {"$set": body})
    return result

async def get_emails(flight_id):
    result = await flight_collection.aggregate([
        {
            "$match": {
                "flight_id": flight_id
            },
        },
        {
                "$project": {
                    "_id": 0,
                    "passengers": 1
                }
        }
    ]).to_list(None)
    return result

async def book_flight(flight_id, email):
    result = await flight_collection.update_one(
        {"flight_id": flight_id},
        {"$addToSet": {"passengers": email}}
    )
    return result.modified_count