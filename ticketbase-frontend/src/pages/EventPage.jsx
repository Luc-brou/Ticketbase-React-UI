import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function EventPage() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    fetch(`https://nscc-0489720-web-app-eje7d3g3fhd5hqc2.eastus2-01.azurewebsites.net/api/concerts/${id}`)
      .then(res => res.json())
      .then(data => setEvent(data))
      .catch(err => console.error("Error fetching event:", err));
  }, [id]);

  if (!event) return <p>Loading...</p>;

  return (
    <div className="container mt-4">
      <h2 className="mb-3">{event.title}</h2>
      <p>{event.description}</p>
      <p><strong>Date:</strong> {new Date(event.concertDate).toLocaleDateString()}</p>
      <p><strong>Genre:</strong> {event.genre?.title}</p>
      <Link to={`/purchase/${event.concertID}`} className="btn btn-primary">
        Buy Tickets
      </Link>
    </div>
  );
}