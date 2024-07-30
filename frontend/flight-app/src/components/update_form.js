// UpdateForm.js
import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Box,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";

function UpdateForm() {
  const [flightId, setFlightId] = useState("");
  const [flightData, setFlightData] = useState(null);
  const [changeType, setChangeType] = useState("");
  const [formValues, setFormValues] = useState({
    airline: "",
    status: "",
    departureGate: "",
    arrivalGate: "",
    scheduledDeparture: "",
    scheduledArrival: "",
  });
  useEffect(() => {
    console.log("Change Type updated: ", changeType);
  }, [changeType]);
  const fetchFlightDetails = async () => {
    await fetch(`http://localhost:8000/flights/${flightId}`, { method: "GET" }) // Replace with your actual API endpoint
      .then((response) => response.json())
      .then((data) => {
        console.log(data.data);
        setFlightData(data.data);
        setFormValues({
          airline: data.data.airline,
          status: data.data.status,
          departureGate: data.data.departure_gate,
          arrivalGate: data.data.arrival_gate,
          scheduledDeparture: new Date(
            data.data.scheduled_departure
          ).toLocaleString(),
          scheduledArrival: new Date(
            data.data.scheduled_arrival
          ).toLocaleString(),
        });
        console.log("Flight updated:", formValues);
      })
      .catch((error) => console.error("Error fetching flight details:", error));
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const updatedFlight = {
      flight_id: flightId,
      airline: formValues.airline,
      status: formValues.status,
      departure_gate: formValues.departureGate,
      arrival_gate: formValues.arrivalGate,
      scheduled_departure: formValues.scheduledDeparture,
      scheduled_arrival: formValues.scheduledArrival,
      type: changeType,
    };
    console.log(updatedFlight);
    fetch(`http://localhost:8000/admin/updateFlight/${flightId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedFlight),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Flight updated:", data);
        setFlightData(null);
        setFormValues({
          airline: "",
          status: "",
          departureGate: "",
          arrivalGate: "",
          scheduledDeparture: "",
          scheduledArrival: "",
        });
        setFlightId("");
        setChangeType("");
      })
      .catch((error) => console.error("Error updating flight:", error));
  };

  return (
    <Box className="form-container">
      <h2>Update Flight Details</h2>
      <TextField
        label="Flight ID"
        value={flightId}
        onChange={(e) => setFlightId(e.target.value)}
        fullWidth
        margin="normal"
        required
      />
      <Button
        variant="contained"
        color="primary"
        onClick={fetchFlightDetails}
        disabled={!flightId}
      >
        Fetch Flight Details
      </Button>
      {flightData && (
        <form onSubmit={handleUpdate} className="admin-form">
          <TextField
            label="Airline"
            value={formValues.airline}
            onChange={(e) =>
              setFormValues({ ...formValues, airline: e.target.value })
            }
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Status"
            value={formValues.status}
            onChange={(e) =>
              setFormValues({ ...formValues, status: e.target.value })
            }
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Departure Gate"
            value={formValues.departureGate}
            onChange={(e) =>
              setFormValues({ ...formValues, departureGate: e.target.value })
            }
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Arrival Gate"
            value={formValues.arrivalGate}
            onChange={(e) =>
              setFormValues({ ...formValues, arrivalGate: e.target.value })
            }
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Scheduled Departure"
            value={formValues.scheduledDeparture}
            onChange={(e) =>
              setFormValues({
                ...formValues,
                scheduledDeparture: e.target.value,
              })
            }
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Scheduled Arrival"
            value={formValues.scheduledArrival}
            onChange={(e) =>
              setFormValues({ ...formValues, scheduledArrival: e.target.value })
            }
            fullWidth
            margin="normal"
            required
          />
          <FormControl fullWidth margin="normal" required>
            <InputLabel>Change Type</InputLabel>
            <Select
              value={changeType}
              onChange={(e) => {
                setChangeType(e.target.value);
                console.log("type ", changeType);
              }}
            >
              <MenuItem value="delay">Delay</MenuItem>
              <MenuItem value="cancellation">Cancellation</MenuItem>
              <MenuItem value="gate_change">Gate Change</MenuItem>
            </Select>
          </FormControl>
          <Button type="submit" variant="contained" color="primary">
            Update Flight
          </Button>
        </form>
      )}
    </Box>
  );
}

export default UpdateForm;
