import { useRouter } from "next/router";
import { useState } from "react";
import AddCommentItem from "../../components/events/comments/AddCommentItem";
import CommentList from "../../components/events/comments/CommentList";
import EventItem from "../../components/events/EventItem";
import { Comment, Event } from "../../types/types";

type EventDetailPageProps = {
  event: Event;
  comments: Comment[];
};

function EventDetailPage({ event, comments }: EventDetailPageProps) {
  const router = useRouter();
  //const event = getEventById(router.query.eventId);
  const [showComments, setShowComments] = useState<boolean>(false);
  const [commentList, setCommentList] = useState<Comment[]>(comments);

  async function updateCommentList(newCommentList: Comment[]) {
    setCommentList(newCommentList);
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: "10px",
      }}
    >
      <h1>Event Detail Page</h1>
      {event && <EventItem event={event} />}

      {showComments ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <AddCommentItem
            eventId={event.id}
            updateCommentList={updateCommentList}
          />
          <h2>Comments</h2>
          <CommentList commentList={commentList} />
        </div>
      ) : (
        <button
          onClick={() => setShowComments(true)}
          style={{
            padding: "15px 20px",
            fontWeight: "bold",
            backgroundColor: "maroon",
            borderRadius: "10px",
            border: "none",
          }}
        >
          Show Comments
        </button>
      )}
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

async function getComments(eventId: string) {
  const commentData = await fetch(
    `http://localhost:3000/api/comments/${eventId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return commentData.json();
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

export async function getStaticPaths() {
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

  const comments = await getComments(eventId);

  return {
    props: {
      event: event,
      comments: comments,
    },
    revalidate: 30,
  };
}

export default EventDetailPage;
