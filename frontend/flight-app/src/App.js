// App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import AdminForm from "./components/admin_form";
import Home from "./components/home";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <h1 className="heading">Hack To Hire</h1>
        <nav className="flex">
          <Link to="/" className="nav-link">
            Home
          </Link>
          <Link to="/admin" className="nav-link">
            Admin
          </Link>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<AdminForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
