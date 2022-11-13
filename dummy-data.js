const DUMMY_EVENTS = [
  {
    id: "e1",
    title: "Foxes for Everyone",
    description:
      "Everyone love foxes! Yes, everyone! In this live event, we are going to go through all the key basics and get you started with caring for foxes.",
    location: "Somestreet 25, 12345 San Somewhereo",
    date: "2021-05-12",
    image: "images/fox_001.jpg",
    isFeatured: false,
  },
  {
    id: "e2",
    title: "Foxes for introverts",
    description:
      "Everyone love foxes! Yes, everyone! In this live event, we are going to go through all the key basics and get you started with caring for foxes for introverts.",
    location: "New Wall Street 5, 98765 New Work",
    date: "2021-05-30",
    image: "images/fox_002.jpg",
    isFeatured: true,
  },
  {
    id: "e3",
    title: "Foxes for extroverts",
    description:
      "Everyone love foxes! Yes, everyone! In this live event, we are going to go through all the key basics and get you started with caring for foxes for extroverts.",
    location: "My Street 12, 10115 Broke City",
    date: "2022-04-10",
    image: "images/fox_003.jpg",
    isFeatured: true,
  },
];

export function getFeaturedEvents() {
  return DUMMY_EVENTS.filter((event) => event.isFeatured);
}

export function getAllEvents() {
  return DUMMY_EVENTS;
}

export function getFilteredEvents(dateFilter) {
  const { year, month } = dateFilter;

  let filteredEvents = DUMMY_EVENTS.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === year && eventDate.getMonth() === month - 1
    );
  });

  return filteredEvents;
}

export function getEventById(id) {
  return DUMMY_EVENTS.find((event) => event.id === id);
}
