import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function EventPage() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3000/api/concerts/${id}`)
      .then(res => res.json())
      .then(data => setEvent(data))
      .catch(err => console.error("Error fetching event:", err));
  }, [id]);

  if (!event) return <p>Loading...</p>;

  return (
    <div className="container mt-4">
      <h2 className="mb-3">{event.Title}</h2>
      <p>{event.Description}</p>
      <p><strong>Date:</strong> {new Date(event.ConcertDate).toLocaleDateString()}</p>
      <p><strong>Genre:</strong> {event.GenreTitle}</p>
      <Link to={`/purchase/${event.ConcertID}`} className="btn btn-primary">
        Buy Tickets
      </Link>
    </div>
  );
}