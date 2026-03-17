import React, { useState, useEffect} from "react";
import "./Dashboard.css";

function Dashboard() {
  const [donors, setDonors] = useState([]);
  const [search, setSearch] = useState("");
  const [bloodFilter, setBloodFilter] = useState("");
  const [loading, setLoading] = useState(true);

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
        setLoading(false);
      });
  }, []);

  // REQUEST TOGGLE
  const handleRequest = (id) => {
    const updated = donors.map((donor) =>
      donor.id === id ? { ...donor, requested: true } : donor
    );
    setDonors(updated);
  };

  // FILTER LOGIC
  const filteredDonors = donors.filter((donor) => {
    return (
      donor.city.toLowerCase().includes(search.toLowerCase()) &&
      (bloodFilter === "" || donor.bloodGroup === bloodFilter)
    );
  });

  // COUNT AVAILABLE
  const availableCount = filteredDonors.filter(
    (d) => d.available
  ).length;

  if (loading) {
    return <div className="loader">Loading donors...</div>;
  }

  return (
    <div className="dashboard">

      <h1 className="title">🩸 Blood Donor Finder</h1>

      {/* FILTERS */}
      <div className="filters">
        <input
          type="text"
          placeholder="Search city..."
          className="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="blood-filter"
          value={bloodFilter}
          onChange={(e) => setBloodFilter(e.target.value)}
        >
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

      {/* {DONOR COUNT} */}
      <p className="donor-count">
        Available donors: {availableCount}
      </p>

      {/* DONOR CARDS */}
      <div className="card-container">
        {filteredDonors.length === 0 ? (
          <p>No donors found</p>
        ) : ( 
          filteredDonors.map((donor) => (
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
                className={`btn ${donor.requested ? "clicked" : ""}`}
                onClick={() => handleRequest(donor.id)}
              >
                {donor.requested ? "Request Sent ✅" : "Request Help"}
              </button>
            </div>
          ))  
        )}
      </div>
    </div>

  );
}

export default Dashboard;