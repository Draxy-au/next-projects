import {
  Dispatch,
  FormEvent,
  SetStateAction,
  useContext,
  useState,
} from "react";
import NotificationContext from "../../../contexts/notification-context";
import styles from "./AddCommentItem.module.css";

type AddCommentItemProps = {
  eventId: string;
  updateCommentList: Function;
};

function AddCommentItem({ eventId, updateCommentList }: AddCommentItemProps) {
  const [title, setTitle] = useState("");
  const [commentText, setCommentText] = useState("");

  const { showNotification } = useContext(NotificationContext);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    showNotification("PENDING", "ADDING COMMENT", "Adding new comment.", 5000);

    const content = {
      title: title,
      author: "DraxyBear",
      text: commentText,
      eventId: eventId,
    };

    const response = await fetch("/api/comments", {
      method: "POST",
      body: JSON.stringify(content),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const newCommentList = await fetch(
      `http://localhost:3000/api/comments/${eventId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const updatedCommentList = await newCommentList.json();

    updateCommentList(updatedCommentList);

    setTitle("");
    setCommentText("");

    showNotification(
      "SUCCESS",
      "COMMENT ADDED",
      "Comment added successfully.",
      5000
    );

    console.log("response: ", await response.json());
  }

  return (
    <form
      className={styles.addCommentForm}
      onSubmit={(e) => {
        handleSubmit(e);
      }}
    >
      <span className={styles.addCommentHeader}>Add Comment</span>
      <input
        type='text'
        className={styles.title}
        placeholder='title...'
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
        }}
      />
      <textarea
        cols={40}
        rows={5}
        maxLength={200}
        className={styles.comment}
        placeholder='comment...'
        value={commentText}
        onChange={(e) => {
          setCommentText(e.target.value);
        }}
      />
      <button className={styles.btn} type='submit'>
        Post Comment
      </button>
    </form>
  );
}

export default AddCommentItem;
