import { NextPageContext } from "next";
import EventList from "../components/events/EventList";
import NewsletterSignup from "../components/newsletter/NewsletterSignup";

import styles from "../styles/Home.module.css";
import { Event } from "../types/types";

type HomeProps = {
  featuredEvents: Event[];
};

export default function Home({ featuredEvents }: HomeProps) {
  return (
    <div className={styles.container}>
      <h1>FEATURED EVENTS PAGE</h1>
      <div className={styles.content}>
        <NewsletterSignup />
        <EventList events={featuredEvents} />
      </div>
    </div>
  );
}

export async function getStaticProps(context: NextPageContext) {
  const response = await fetch(
    "https://nextjs-draxy-default-rtdb.firebaseio.com/eventsdb/events.json"
  );
  const data = await response.json();

  const events = [];

  for (const key in data) {
    events.push({
      id: key,
      ...data[key],
    });
  }

  return {
    props: {
      featuredEvents: events.filter((event) => event.isFeatured),
    },
  };
}
