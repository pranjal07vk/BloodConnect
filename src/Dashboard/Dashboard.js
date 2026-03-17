import React, { useState, useEffect} from "react";
import "./Dashboard.css";

function Dashboard() {
  const [donors, setDonors] = useState([]);
  const [search, setSearch] = useState("");
  const [bloodFilter, setBloodFilter] = useState("");

   //API FETCH
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => {
        const bloodGroups = ["A+", "B+", "O+", "AB+", "O-"];

        const mapped = data.map((user, index) => ({
          id: user.id,
          name: user.name,
          city: user.address.city,
          bloodGroup: bloodGroups[index % bloodGroups.length],
          available: Math.random() > 0.3,
          requested: false,
        }));

        setDonors(mapped);
      });
  }, []);

  // REQUEST TOGGLE
  const handleRequest = (id) => {
    const updated = donors.map((donor) =>
      donor.id === id ? { ...donor, requested: true } : donor
    );
    setDonors(updated);
  };

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
              <div className="badge">{donor.bloodGroup}</div>

              <div className="info">
                <h2>{donor.name}</h2>
                <p>{donor.city}</p>
                <p className={donor.available ? "available" : "not-available"}>
                  {donor.available ? "Available" : "Not Available"}
                </p>
              </div>

              <button
                className="btn"
                onClick={() => handleRequest(donor.id)}
              >
                {donor.requested ? "Request Sent ✅" : "Request Help"}
              </button>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

export default Dashboard;