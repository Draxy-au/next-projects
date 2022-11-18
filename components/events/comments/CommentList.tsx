import type { Comment } from "../../../types/types";
import CommentItem from "./CommentItem";
import styles from "./CommentList.module.css";

type CommentListProps = {
  commentList: Comment[];
};

function CommentList({ commentList }: CommentListProps) {
  if (!Array.isArray(commentList)) {
    console.log(commentList);
  }
  return (
    <div className={styles.commentList}>
      {commentList && Array.isArray(commentList)
        ? commentList.map((comment, key) => {
            return (
              <CommentItem
                key={key}
                text={comment.text}
                author={comment.author}
                date={comment.date}
                title={comment.title}
              />
            );
          })
        : null}
    </div>
  );
}

export default CommentList;
