import Client from "../models/Client.js";

export const getClients = async (req, res) => {
  try {
    const clients = await Client.find();
    res.status(200).json(clients);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createClient = async (req, res) => {
  try {
    const { company_name, country, entity_type } = req.body;

    if (!company_name) {
      return res.status(400).json({ error: "company_name is required" });
    }

    const client = await Client.create({
      company_name,
      country,
      entity_type,
    });

    res.status(201).json(client);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};