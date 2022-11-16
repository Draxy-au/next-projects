import { NextPageContext } from "next";
import { useRouter } from "next/router";
import EventItem from "../../components/events/EventItem";
import { getEventById } from "../../dummy-data";
import { Event } from "../../types/types";

type EventDetailPageProps = {
  event: Event;
};

function EventDetailPage({ event }: EventDetailPageProps) {
  const router = useRouter();
  //const event = getEventById(router.query.eventId);
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

async function getEventData(eventId: string) {
  const response = await fetch(
    `https://nextjs-draxy-default-rtdb.firebaseio.com/eventsdb/events/${eventId}.json`
  );

  const data = await response.json();

  if (!data) {
    return;
  }

  const event = { id: eventId, ...data };

  return event;
}

async function getAllEventData() {
  const response = await fetch(
    `https://nextjs-draxy-default-rtdb.firebaseio.com/eventsdb/events.json`
  );

  const data = await response.json();

  const events = [];

  for (const key in data) {
    events.push({
      id: key,
      ...data[key],
    });
  }

  return events;
}

export async function getStaticPaths(context: NextPageContext) {
  const allEvents = await getAllEventData();

  if (!allEvents) {
    return;
  }

  const paramsArr = allEvents.map((event) => {
    return { params: { eventId: event.id } };
  });

  return {
    paths: paramsArr,
    fallback: false,
  };
}

export async function getStaticProps(context: { params: any }) {
  const { params } = context;

  const eventId = params.eventId;

  if (!eventId) {
    return;
  }

  const event = await getEventData(eventId);

  if (!event) {
    return;
  }

  return {
    props: {
      event: event,
    },
    revalidate: 30,
  };
}

export default EventDetailPage;
