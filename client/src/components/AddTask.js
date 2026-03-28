import { useState } from "react";
import API from "../services/api";

function AddTask({ clientId, refresh }) {
  const [showForm, setShowForm] = useState(false);

  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    due_date: "",
    priority: "Medium",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!form.title || !form.due_date) return;

    await API.post("/tasks", {
      ...form,
      client_id: clientId,
    });

    setForm({
      title: "",
      description: "",
      category: "",
      due_date: "",
      priority: "Medium",
    });

    setShowForm(false);
    refresh();
  };

  return (
    <div className="card">
      {!showForm ? (
        <button onClick={() => setShowForm(true)}>+ Add Task</button>
      ) : (
        <>
          <h3>Add Task</h3>

          <input
            name="title"
            placeholder="Title"
            value={form.title}
            onChange={handleChange}
          />

          <input
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
          />

          <input
            name="category"
            placeholder="Category"
            value={form.category}
            onChange={handleChange}
          />

          <input
            type="date"
            name="due_date"
            value={form.due_date}
            onChange={handleChange}
          />

          <select
            name="priority"
            value={form.priority}
            onChange={handleChange}
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>

          <button onClick={handleSubmit}>Submit</button>
          <button onClick={() => setShowForm(false)}>Cancel</button>
        </>
      )}
    </div>
  );
}

export default AddTask;