function TaskList({ tasks, updateStatus }) {
  const isOverdue = (task) => {
    return (
      task.status === "Pending" &&
      new Date(task.due_date) < new Date()
    );
  };

  return (
    <div>
      <h3>Tasks</h3>

      {tasks.map((task) => (
        <div
          key={task._id}
          className="card"
          style={{
            backgroundColor: isOverdue(task) ? "#ffdddd" : "white",
          }}
        >
          <h4>{task.title}</h4>

          <p><strong>Description:</strong> {task.description || "—"}</p>
          <p><strong>Category:</strong> {task.category || "—"}</p>
          <p><strong>Priority:</strong> {task.priority}</p>

          <p>
            <strong>Due Date:</strong>{" "}
            {new Date(task.due_date).toDateString()}
          </p>

          <p>
            <strong>Status:</strong> {task.status}
          </p>

          <button
            onClick={() =>
              updateStatus(
                task._id,
                task.status === "Pending" ? "Completed" : "Pending"
              )
            }
          >
            Toggle Status
          </button>
        </div>
      ))}
    </div>
  );
}

export default TaskList;