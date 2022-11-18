import { Event } from "../../types/types";
import EventItem from "./EventItem";
import styles from "./EventList.module.css";

type EventListProps = {
  events: Event[];
};

function EventList({ events }: EventListProps) {
  return (
    <ul className={styles.unorderedList}>
      {events.map((event) => (
        <EventItem key={event.id} event={event} />
      ))}
    </ul>
  );
}

export default EventList;
