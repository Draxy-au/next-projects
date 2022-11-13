import EventItem from "./EventItem";
import styles from "./EventList.module.css";

type EventListProps = {
  events: {
    id: string;
    title: string;
    description: string;
    location: string;
    date: string;
    image: string;
    isFeatured: boolean;
  }[];
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
