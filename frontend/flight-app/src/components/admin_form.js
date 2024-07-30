// AdminForm.js
import React, { useState } from "react";
import { TextField, Button, Box } from "@mui/material";

function AdminForm() {
  const [flightId, setFlightId] = useState("");
  const [airline, setAirline] = useState("");
  const [status, setStatus] = useState("");
  const [departureGate, setDepartureGate] = useState("");
  const [arrivalGate, setArrivalGate] = useState("");
  const [scheduledDeparture, setScheduledDeparture] = useState("");
  const [scheduledArrival, setScheduledArrival] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const newFlight = {
      flight_id: flightId,
      airline,
      status,
      departure_gate: departureGate,
      arrival_gate: arrivalGate,
      scheduled_departure: scheduledDeparture,
      scheduled_arrival: scheduledArrival,
    };

    // Send newFlight data to the backend
    fetch("http://localhost:8000/admin/createFlight", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newFlight),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Flight added:", data);
        // Clear the form fields
        setFlightId("");
        setAirline("");
        setStatus("");
        setDepartureGate("");
        setArrivalGate("");
        setScheduledDeparture("");
        setScheduledArrival("");
      })
      .catch((error) => console.error("Error adding flight:", error));
  };

  return (
    <Box className="form-container">
      <h2>Add New Flight</h2>
      <form onSubmit={handleSubmit} className="admin-form">
        <TextField
          label="Flight ID"
          value={flightId}
          onChange={(e) => setFlightId(e.target.value)}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Airline"
          value={airline}
          onChange={(e) => setAirline(e.target.value)}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Departure Gate"
          value={departureGate}
          onChange={(e) => setDepartureGate(e.target.value)}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Arrival Gate"
          value={arrivalGate}
          onChange={(e) => setArrivalGate(e.target.value)}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Scheduled Departure"
          type="datetime-local"
          value={scheduledDeparture}
          onChange={(e) => setScheduledDeparture(e.target.value)}
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          required
        />
        <TextField
          label="Scheduled Arrival"
          type="datetime-local"
          value={scheduledArrival}
          onChange={(e) => setScheduledArrival(e.target.value)}
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          required
        />
        <Button type="submit" variant="contained" color="primary">
          Add Flight
        </Button>
      </form>
    </Box>
  );
}

export default AdminForm;
