import styles from "./CommentItem.module.css";

type CommentItemProps = {
  title: string;
  author: string;
  text: string;
  date: string;
};

function CommentItem({
  title = "Comment title",
  author = "author",
  text = "Comment content",
  date = "12 Nov",
}: CommentItemProps) {
  return (
    <div className={styles.commentBox}>
      <div className={styles.commentTitle}>{title}</div>

      <div className={styles.commentText}>{text}</div>
      <div className={styles.commentFooter}>
        <div className={styles.commentDate}>{date}</div>
        <div className={styles.commentAuthor}>@{author}</div>
      </div>
    </div>
  );
}

export default CommentItem;
