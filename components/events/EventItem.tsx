import Link from "next/link";
import styles from "./EventItem.module.css";
import CalendarMonth from "@mui/icons-material/CalendarMonth";
import PlaceIcon from "@mui/icons-material/Place";
import { Event } from "../../types/types";
import Image from "next/image";

type EventItemProps = {
  event: Event;
};

function EventItem({ event }: EventItemProps) {
  return (
    <li
      key={event.id}
      style={{ listStyleType: "none" }}
      className={styles.lineItem}
    >
      <Image
        src={`/${event.image}`}
        alt={event.title}
        height={640}
        width={480}
      />
      <div className={styles.eventInfo}>
        <h2>{event.title}</h2>
        <div>
          <CalendarMonth /> {event.date}
        </div>
        <div>
          <PlaceIcon /> {event.location}
        </div>
        <div>{event.description}</div>
        <div>
          <Link href={`/events/${event.id}`} className={styles.link}>
            Explore Event
          </Link>
        </div>
        <button
          style={{
            padding: "10px 20px",
            backgroundColor: "blueviolet",
            fontWeight: "bold",
          }}
        >
          {event.isFeatured ? "Un-Feature" : "Feature"}
        </button>
      </div>
    </li>
  );
}

export default EventItem;
