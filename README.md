# Flight Status Update System

This project is a real-time flight status update and notification system. It includes a backend server, a frontend interface, and a consumer service that uses RabbitMQ for message queuing.

## Tech Stack

- **Backend:** Python, FastAPI
- **Frontend:** React, JavaScript, HTML, CSS
- **Message Queue:** RabbitMQ
- **Database:** MongoDB

## Getting Started

### Prerequisites

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/)
- [Python](https://www.python.org/)
- [Docker](https://www.docker.com/)

### Clone the Repository

```bash
git clone https://github.com/bawejahritik/hack-to-hire.git
```

### Starting the Server

1. Navigate to the server directory:
   ```bash
   cd server
   ```
2. Install the required Python packages:
   ```bash
   pip install -r requirements.txt
   ```
3. Start the FastAPI server:
   ```bash
   fastapi dev main.py
   ```

### Starting the Frontend

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install the necessary dependencies:
   ```bash
   npm install
   ```
3. Start the React development server:
   ```bash
   npm start
   ```

### Starting the Consumer (RabbitMQ)

1. Navigate to the consumer directory:
   ```bash
   cd consumer
   ```
2. Install the required Python packages:
   ```bash
   pip install -r requirements.txt
   ```
3. Start the consumer service:
   ```bash
   python main.py
   ```

### Running RabbitMQ with Docker

To run RabbitMQ using Docker, use the following command:

```bash
sudo docker run -it --rm --name rabbitmq -p 5672:5672 -p 15672:15672 rabbitmq:3-management
```

## Routes

- **`/`**: Home directory
- **`/createFlight`**: Admin route to create new flights
- **`/updateFlight`**: Admin route to update existing flights

## Environment Variables

### Server

Create a `.env` file in the `server` directory with the following content:

```
MONGODB_URI=<your-mongodb-uri>
```

### Consumer

Create a `.env` file in the `consumer` directory with the following content:

```
EMAIL_PASSWORD=<your-email-password>
```
