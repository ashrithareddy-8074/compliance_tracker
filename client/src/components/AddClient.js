import { useState } from "react";
import API from "../services/api";

function AddClient({ refresh }) {
  const [showForm, setShowForm] = useState(false);
  const [company, setCompany] = useState("");
  const [country, setCountry] = useState("");
  const [type, setType] = useState("");

  const handleSubmit = async () => {
    if (!company) return;

    await API.post("/clients", {
      company_name: company,
      country,
      entity_type: type,
    });

    setCompany("");
    setCountry("");
    setType("");
    setShowForm(false);
    refresh();
  };

  return (
    <div className="card">
      {!showForm ? (
        <button onClick={() => setShowForm(true)}>+ Add Client</button>
      ) : (
        <>
          <h3>Add Client</h3>

          <input
            placeholder="Company Name"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          />

          <input
            placeholder="Country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />

          <input
            placeholder="Entity Type"
            value={type}
            onChange={(e) => setType(e.target.value)}
          />

          <button onClick={handleSubmit}>Submit</button>
          <button onClick={() => setShowForm(false)}>Cancel</button>
        </>
      )}
    </div>
  );
}

export default AddClient;