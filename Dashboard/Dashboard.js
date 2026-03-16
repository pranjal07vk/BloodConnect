import React from "react";
import "./dashboard.css";

function Dashboard() {
  return (
    <div className="dashboard">

      <h1 className="title">🩸 Blood Donor Finder</h1>

      <div className="filters">
        <input
          type="text"
          placeholder="Search city..."
          className="search"
        />

        <select className="blood-filter">
          <option value="">All Blood Groups</option>
          <option>A+</option>
          <option>B+</option>
          <option>O+</option>
          <option>AB+</option>
          <option>A-</option>
          <option>B-</option>
          <option>O-</option>
          <option>AB-</option>
        </select>
      </div>

      <p className="donor-count">Available donors: 0</p>

      <div className="donor-list">
        {/* Donor cards will appear here */}
      </div>

    </div>
  );
}

export default Dashboard;