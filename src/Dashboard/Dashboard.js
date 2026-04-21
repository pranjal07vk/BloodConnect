import React, { useState, useEffect} from "react";
import "./Dashboard.css";

function Dashboard({ username, onLogout }) {
  const [donors, setDonors] = useState([]);
  const [search, setSearch] = useState("");
  const [bloodFilter, setBloodFilter] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if donors exist in localStorage
    let savedDonors = JSON.parse(localStorage.getItem("bloodConnectDonors"));
    
    if (!savedDonors || savedDonors.length === 0) {
      // Initialize with some dummy data if empty
      savedDonors = [
        { id: 1, name: "Leanne Graham", city: "Gwenborough", bloodGroup: "A+", available: true, requested: false },
        { id: 2, name: "Ervin Howell", city: "Wisokyburgh", bloodGroup: "B+", available: true, requested: false },
        { id: 3, name: "Clementine Bauch", city: "McKenziehaven", bloodGroup: "O+", available: false, requested: false },
        { id: 4, name: "Patricia Lebsack", city: "South Elvis", bloodGroup: "AB+", available: true, requested: false },
      ];
      localStorage.setItem("bloodConnectDonors", JSON.stringify(savedDonors));
    }

    setDonors(savedDonors);
    setLoading(false);
  }, []);

  // REQUEST TOGGLE
  const handleRequest = (id) => {
    const updated = donors.map((donor) =>
      donor.id === id ? { ...donor, requested: true } : donor
    );
    setDonors(updated);
    // Optional: Save requested state back to local storage
    localStorage.setItem("bloodConnectDonors", JSON.stringify(updated));
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

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 className="title">🩸 Blood Donor Finder</h1>
        <button onClick={onLogout} style={{ padding: '8px 16px', background: '#e74c3c', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          Logout
        </button>
      </div>

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
              <div className="badge">
                <span>{donor.bloodGroup}</span>
              </div>

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