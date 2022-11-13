import { useRouter } from "next/router";
import { useState } from "react";
import EventList from "../../components/events/EventList";
import { getAllEvents } from "../../dummy-data";

function EventsPage() {
  const allEvents = getAllEvents();
  const router = useRouter();

  const [month, setMonth] = useState("1");
  const [year, setYear] = useState("2019");
  const [eventList, setEventList] = useState(allEvents);
  const [filteredResults, setFilteredResults] = useState(false);

  function goHandler() {
    const newEventList = allEvents.filter((event) => {
      const eMonth = new Date(event.date).getMonth() + 1;
      const eYear = new Date(event.date).getFullYear();
      if (eMonth === +month && eYear === +year) {
        return true;
      }
    });

    setFilteredResults(true);
    setEventList(newEventList);
  }

  function urlHandler() {
    router.push(`/events/${year}/${month}`);
  }

  function clearFilterHandler() {
    setEventList(allEvents);
    setFilteredResults(false);
  }

  return (
    <div
      style={{
        padding: "0 20px",
      }}
    >
      <h1>ALL EVENTS PAGE</h1>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "20px",

          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {filteredResults && <button onClick={clearFilterHandler}>X</button>}
        <select value={month} onChange={(e) => setMonth(e.target.value)}>
          <option value={1}>Jan</option>
          <option value={2}>Feb</option>
          <option value={3}>Mar</option>
          <option value={4}>Apr</option>
          <option value={5}>May</option>
          <option value={6}>Jun</option>
          <option value={7}>Jul</option>
          <option value={8}>Aug</option>
          <option value={9}>Sep</option>
          <option value={10}>Oct</option>
          <option value={11}>Nov</option>
          <option value={12}>Dec</option>
        </select>
        <select value={year} onChange={(e) => setYear(e.target.value)}>
          <option value={2019}>2019</option>
          <option value={2020}>2020</option>
          <option value={2021}>2021</option>
          <option value={2022}>2022</option>
        </select>
        <button onClick={goHandler}>GO</button>
        <button onClick={urlHandler}>URL</button>
      </div>
      <EventList events={eventList} />
    </div>
  );
}

export default EventsPage;
