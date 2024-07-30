// App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import AdminForm from "./components/admin_form";
import UpdateForm from "./components/update_form";
import Home from "./components/home";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <h1 className="heading">Flight Management</h1>
        {/* <nav>
          <Link to="/" className="nav-link">
            Home
          </Link>
          <Link to="/admin" className="nav-link">
            Add Flight
          </Link>
          <Link to="/update" className="nav-link">
            Update Flight
          </Link>
        </nav> */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<AdminForm />} />
          <Route path="/update" element={<UpdateForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
