import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function EventPage() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/api/events/${id}`)
      .then(res => res.json())
      .then(data => setEvent(data))
      .catch(err => console.error("Error fetching event:", err));
  }, [id]);

  if (!event) return <p>Loading...</p>;

  return (

  <div className="container mt-4">
  <h2 className="mb-3">{event.title}</h2>
  <p>{event.description}</p>
  <p><strong>Date:</strong> {event.date}</p>
  <p><strong>Location:</strong> {event.location}</p>
  <Link to={`/purchase/${event.id}`} className="btn btn-primary">
    Buy Tickets
  </Link>
</div>
  );
}