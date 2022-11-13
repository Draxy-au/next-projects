import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import EventList from "../../components/events/EventList";
import { getAllEvents } from "../../dummy-data";

function FilterEventsPage() {
  const router = useRouter();

  const allEvents = getAllEvents();

  const [eventList, setEventList] = useState(allEvents);
  const [month, setMonth] = useState(0);
  const [year, setYear] = useState(0);

  useEffect(() => {
    if (router.query.slug && router.query.slug[0] && router.query.slug[1]) {
      const slugYear = router.query.slug[0];
      const slugMonth = router.query.slug[1];
      setYear(+slugYear);
      setMonth(+slugMonth);
    }

    const newEventList = allEvents.filter((event) => {
      const eMonth = new Date(event.date).getMonth() + 1;
      const eYear = new Date(event.date).getFullYear();

      console.log(month);
      console.log(year);
      console.log(eMonth);
      console.log(eYear);
      if (eMonth == month && eYear == year) {
        return true;
      }
    });
    console.log(newEventList);
    setEventList(newEventList);
  }, [router.query.slug, year, month]);

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

export default FilterEventsPage;
