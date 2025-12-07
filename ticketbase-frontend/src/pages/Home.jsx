import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Home() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch("https://nscc-0489720-web-app-eje7d3g3fhd5hqc2.eastus2-01.azurewebsites.net/api/concerts")
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
            key={ev.concertID}
            to={`/events/${ev.concertID}`}
            className="list-group-item list-group-item-action"
          >
            <strong>{ev.title}</strong> — {new Date(ev.concertDate).toLocaleDateString()}
          </Link>
        ))}
      </div>
    </div>
  );
}