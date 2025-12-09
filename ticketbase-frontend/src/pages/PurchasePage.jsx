import { useParams } from "react-router-dom";
import { useState } from "react";

export default function PurchasePage() {
  const { id } = useParams();
  const [form, setForm] = useState({ tickets: 1, name: "", email: "", card: "" });
  const [message, setMessage] = useState("");

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    if (!form.name || !form.email || !form.card) {
      setMessage("All fields are required.");
      return;
    }
    try {
     const res = await fetch("http://localhost:3000/api/concerts/purchases", {
      method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    concertId: parseInt(id, 10),
    numTickets: parseInt(form.tickets, 10),
    customerDetails: `${form.name}, ${form.email}`,
    cardToken: form.card
  })
});
      const data = await res.json();
      if (res.ok) {
        setMessage("Purchase confirmed! Check your email.");
      } else {
        setMessage(`Error: ${data.message || "Unable to process purchase."}`);
      }
    } catch {
      setMessage("Server error. Try again later.");
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-3">Purchase Tickets</h2>
      <form onSubmit={handleSubmit} className="needs-validation">
        <div className="mb-3">
          <label className="form-label">Number of Tickets</label>
          <input
            type="number"
            name="tickets"
            value={form.tickets}
            onChange={handleChange}
            min="1"
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Full Name</label>
          <input
            type="text"
            name="name"
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            name="email"
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Credit Card Number</label>
          <input
            type="text"
            name="card"
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <button type="submit" className="btn btn-success">Buy Tickets</button>
      </form>
      {message && <div className="alert alert-info mt-3">{message}</div>}
    </div>
  );
}