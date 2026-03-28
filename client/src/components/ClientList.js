function ClientList({ clients, setSelectedClient }) {
  return (
    <div>
      <h3>Clients</h3>

      {clients.map((client) => (
        <div
          key={client._id}
          onClick={() => setSelectedClient(client)}
          className="client-item"
        >
          {client.company_name}
        </div>
      ))}
    </div>
  );
}

export default ClientList;