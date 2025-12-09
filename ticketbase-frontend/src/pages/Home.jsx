import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Home() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/concerts")
      .then(res => res.json())
      .then(data => setEvents(data))
      .catch(err => console.error("Error fetching concerts:", err));
  }, []);

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Upcoming Concerts</h1>
      <div className="list-group">
        {events.map(ev => (
          <Link
            key={ev.ConcertID}
            to={`/events/${ev.ConcertID}`}
            className="list-group-item list-group-item-action"
          >
            <strong>{ev.Title}</strong> —{" "}
            {new Date(ev.ConcertDate).toLocaleDateString()}
          </Link>
        ))}
      </div>
    </div>
  );
}