import { useRouter } from "next/router";
import EventItem from "../../components/events/EventItem";
import { getEventById } from "../../dummy-data";

function EventDetailPage() {
  const router = useRouter();
  const event = getEventById(router.query.eventId);
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <h1>Event Detail Page</h1>
      {event && <EventItem event={event} />}
    </div>
  );
}

export default EventDetailPage;
