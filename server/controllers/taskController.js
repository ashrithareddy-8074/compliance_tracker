import Task from "../models/Task.js";

export const getTasksByClient = async (req, res) => {
  try {
    const { clientId } = req.params;

    const tasks = await Task.find({ client_id: clientId });
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createTask = async (req, res) => {
  try {
    const {
      client_id,
      title,
      description,
      category,
      due_date,
      priority,
    } = req.body;

    if (!client_id || !title || !due_date) {
      return res.status(400).json({
        error: "client_id, title and due_date are required",
      });
    }

    const task = await Task.create({
      client_id,
      title,
      description,
      category,
      due_date,
      priority,
    });

    res.status(201).json(task);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const updateTaskStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ error: "status is required" });
    }

    if (!["Pending", "Completed"].includes(status)) {
      return res.status(400).json({
        error: "status must be either 'Pending' or 'Completed'",
      });
    }

    const task = await Task.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.status(200).json(task);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};