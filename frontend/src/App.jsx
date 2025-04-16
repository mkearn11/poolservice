import { useState } from "react";

export default function App() {
  const [token, setToken] = useState(null);
  const [email, setEmail] = useState("novapools@gmail.com");
  const [password, setPassword] = useState("pool123456");
  const [view, setView] = useState("dashboard");
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [form, setForm] = useState({
    name: "",
    address: "",
    poolType: "",
    poolSize: "",
    sanitizerType: ""
  });

  const handleLogin = (e) => {
    e.preventDefault();
    if (email === "novapools@gmail.com" && password === "pool123456") {
      setToken("mock-token");
    } else {
      alert("Invalid credentials");
    }
  };

  const handleAddCustomer = (e) => {
    e.preventDefault();
    setCustomers([...customers, { ...form, invoices: [] }]);
    setForm({ name: "", address: "", poolType: "", poolSize: "", sanitizerType: "" });
  };

  const getMapUrl = (address) => {
    const encoded = encodeURIComponent(address);
    return `https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=${encoded}`;
  };

  if (!token) {
    return (
      <div className="login">
        <h1>Nova Pools Login</h1>
        <form onSubmit={handleLogin}>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
          <button type="submit">Login</button>
        </form>
      </div>
    );
  }

  if (view === "customers") {
    return (
      <div>
        <h1>Customers</h1>
        <form onSubmit={handleAddCustomer}>
          <input placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <input placeholder="Address" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />
          <input placeholder="Pool Type" value={form.poolType} onChange={(e) => setForm({ ...form, poolType: e.target.value })} />
          <input placeholder="Pool Size" value={form.poolSize} onChange={(e) => setForm({ ...form, poolSize: e.target.value })} />
          <input placeholder="Sanitizer Type" value={form.sanitizerType} onChange={(e) => setForm({ ...form, sanitizerType: e.target.value })} />
          <button type="submit">Add Customer</button>
        </form>

        {customers.map((c, idx) => (
          <div key={idx} onClick={() => { setSelectedCustomer(c); setView("detail"); }}>
            <h3>{c.name}</h3>
            <p>{c.address}</p>
          </div>
        ))}

        <button onClick={() => setView("dashboard")}>Back</button>
      </div>
    );
  }

  if (view === "detail" && selectedCustomer) {
    return (
      <div>
        <h2>{selectedCustomer.name}'s Info</h2>
        <p>{selectedCustomer.address}</p>
        <p>Pool Type: {selectedCustomer.poolType}</p>
        <p>Pool Size: {selectedCustomer.poolSize}</p>
        <p>Sanitizer Type: {selectedCustomer.sanitizerType}</p>

        <iframe
          width="100%"
          height="300"
          frameBorder="0"
          style={{ border: 0 }}
          src={getMapUrl(selectedCustomer.address)}
          allowFullScreen
        ></iframe>

        <h3>Invoices</h3>
        <p>No invoices yet.</p>

        <button onClick={() => setView("customers")}>Back to Customers</button>
      </div>
    );
  }

  return (
    <div>
      <h1>Nova Pools Dashboard</h1>
      <button onClick={() => setView("customers")}>Go to Customers</button>
    </div>
  );
}
