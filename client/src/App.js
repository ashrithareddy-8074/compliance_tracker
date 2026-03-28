import { useEffect, useState, useCallback } from "react";
import API from "./services/api";

import ClientList from "./components/ClientList";
import AddClient from "./components/AddClient";
import TaskList from "./components/TaskList";
import AddTask from "./components/AddTask";

import "./index.css";

function App() {
  const [selectedClient, setSelectedClient] = useState(null);
  const [clients, setClients] = useState([]);
  const [tasks, setTasks] = useState([]);

  const fetchClients = async () => {
    try {
      const res = await API.get("/clients");
      setClients(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchTasks = useCallback(async () => {
  if (!selectedClient) return;

  try {
    const res = await API.get(`/tasks/${selectedClient._id}`);
    setTasks(res.data);
  } catch (err) {
    console.error(err);
  }
}, [selectedClient]);

  useEffect(() => {
    fetchClients();
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const updateStatus = async (id, status) => {
    try {
      await API.put(`/tasks/${id}`, { status });
      fetchTasks();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container">
      <div style={{ width: "30%" }}>
        <AddClient refresh={fetchClients} />

        <ClientList
          clients={clients}
          setSelectedClient={setSelectedClient}
        />
      </div>

      <div style={{ width: "70%" }}>
        {selectedClient ? (
          <>
            <div className="card">
              <h2>{selectedClient.company_name}</h2>

              <p>
                <strong>Country:</strong> {selectedClient.country || "—"}
              </p>

              <p>
                <strong>Entity Type:</strong> {selectedClient.entity_type || "—"}
              </p>
            </div>

            <AddTask
              clientId={selectedClient._id}
              refresh={fetchTasks}
            />

            <TaskList
              tasks={tasks}
              updateStatus={updateStatus}
            />
          </>
        ) : (
          <p>Select a client to view tasks</p>
        )}
      </div>
    </div>
  );
}

export default App;