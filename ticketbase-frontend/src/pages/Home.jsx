import { useEffect, useState } from "react";

export default function Home() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/events") //should eventually use actual data
      .then(res => res.json())
      .then(data => setEvents(data))
      .catch(err => console.error("Error fetching events:", err));
  }, []);

  return (
  <div className="container mt-4">
    <h1 className="mb-4">Upcoming Events</h1>
    <div className="list-group">
    {events.map(ev => (
      <Link
        key={ev.id}
        to={`/events/${ev.id}`}
        className="list-group-item list-group-item-action"
      >
        <strong>{ev.title}</strong> — {ev.date}
      </Link>
    ))}
  </div>
</div>
  );
}