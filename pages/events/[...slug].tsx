import { GetServerSideProps } from "next";
import Link from "next/link";
import { useEffect, useState } from "react";
import EventList from "../../components/events/EventList";
import { Event } from "../../types/types";

type FilterEventsPageProps = {
  filteredEvents: Event[];
};

function FilterEventsPage({ filteredEvents }: FilterEventsPageProps) {
  const [eventList, setEventList] = useState(filteredEvents);

  useEffect(() => {
    if (filteredEvents) {
      setEventList(filteredEvents);
    }
  }, [filteredEvents]);

  return (
    <div style={{ padding: "0px 20px" }}>
      {eventList.length > 0 && (
        <>
          <h1>Filtered Events Page</h1>
          <EventList events={eventList} />
        </>
      )}
      {eventList.length < 1 && (
        <>
          <h1>Invalid Event Date Filter</h1>
          <Link href='/events'>
            <button
              style={{
                padding: "10px 20px",
                backgroundColor: "blueviolet",
                fontWeight: "bold",
                borderRadius: "10px",
              }}
            >
              Show All Events
            </button>
          </Link>
        </>
      )}
    </div>
  );
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

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { params } = context;

  if (!params) {
    return { props: {} };
  }

  const filteredParams = params.slug;

  if (!filteredParams) {
    return { props: {} };
  }

  const slugYear = +filteredParams[0] || 0;
  const slugMonth = +filteredParams[1] || 0;

  const allEvents = await getAllEventData();

  const newEventList = allEvents.filter((event) => {
    const eMonth = new Date(event.date).getMonth() + 1;
    const eYear = new Date(event.date).getFullYear();

    if (eMonth == slugMonth && eYear == slugYear) {
      return true;
    }
  });

  return {
    props: {
      filteredEvents: newEventList,
    },
  };
};

export default FilterEventsPage;
