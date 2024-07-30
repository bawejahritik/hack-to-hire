import { Modal, Box, Button, TextField } from "@mui/material";
import React, { useState, useEffect } from "react";
//import "./App.css";

function FlightCard(props) {
  const [open, setOpen] = useState(false);
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [email, setEmail] = useState("");
  const handleOpen = (flight) => {
    setSelectedFlight(flight);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEmail("");
  };

  const handleBooking = () => {
    fetch(
      "http://localhost:8000/flights/book_flight/" + selectedFlight.flight_id,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ flight_id: selectedFlight.flight_id, email }),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("Booking success:", data);
        handleClose();
      })
      .catch((error) => console.error("Error booking flight:", error));
  };
  return (
    <div className="flight-list">
      {props.flights.length > 0 ? (
        props.flights.map((flight) => (
          <div key={flight.flight_id} className="flight-card">
            <h2 className="flight-id">{flight.flight_id}</h2>
            <p>Airline: {flight.airline}</p>
            <p>Status: {flight.status}</p>
            <p>Departure Gate: {flight.departure_gate}</p>
            <p>Arrival Gate: {flight.arrival_gate}</p>
            <p>
              Scheduled Departure:{" "}
              {new Date(flight.scheduled_departure).toLocaleString()}
            </p>
            <p>
              Scheduled Arrival:{" "}
              {new Date(flight.scheduled_arrival).toLocaleString()}
            </p>
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleOpen(flight)}
            >
              Book
            </Button>
            <Modal open={open} onClose={handleClose}>
              <Box className="modal-box">
                <h2>Booking for {selectedFlight?.flight_id}</h2>
                <TextField
                  label="Email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  fullWidth
                  margin="normal"
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleBooking}
                  disabled={!email}
                >
                  Book Now
                </Button>
              </Box>
            </Modal>
          </div>
        ))
      ) : (
        <p>No flights available</p>
      )}
    </div>
  );
}

export default FlightCard;
