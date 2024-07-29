import React, { useState, useEffect } from "react";

import FlightCard from "./flight_card";

function Home() {
  const [flights, setFlights] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/admin/") // Replace with your actual API endpoint
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        if (data && data.data) {
          setFlights(data.data);
        } else {
          console.error("Invalid response structure:", data);
        }
      })
      .catch((error) => console.error("Error fetching flights:", error));
  }, []);

  return (
    <div className="App">
      <h1 className="heading">Available Flights</h1>
      <FlightCard flights={flights}></FlightCard>
    </div>
  );
}

export default Home;
