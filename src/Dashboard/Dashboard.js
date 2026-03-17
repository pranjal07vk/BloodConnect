import React from "react";
import "./Dashboard.css";

function Dashboard() {
  const donors = [
    {
      id: 1,
      name: "Rahul Sharma",
      city: "Bangalore",
      bloodGroup: "O+",
      available: true,
    },
    {
      id: 2,
      name: "Anjali Verma",
      city: "Delhi",
      bloodGroup: "A+",
      available: false,
    },
  ];

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
        <div className="card-container">
          {donors.map((donor) => (
            <div className="card" key={donor.id}>
            
              {/* Blood badge */}
              <div className="badge">{donor.bloodGroup}</div>

              <div className="info">
                <h2>{donor.name}</h2>
                <p>{donor.city}</p>
                <p className={donor.available ? "available" : "not-available"}>
                  {donor.available ? "Available" : "Not Available"}
                </p>
              </div>

              <button className="btn">Request Help</button>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

export default Dashboard;