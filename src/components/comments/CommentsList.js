import CommentItem from "./CommentItem";
import classes from "./CommentsList.module.css";
import { getComment } from "../util/api";
import { useEffect, useState } from "react";

const CommentsList = () => {
  const [comments, setComments] = useState([]);
  useEffect(() => {
    const data = async () => {
      const data = await getComment();
      setComments(data);
    };
    data();
  }, []);
  return (
    <ul className={classes.comments}>
      {comments &&
        comments.map((comment) => (
          <CommentItem
            key={comment.id}
            name={comment.name}
            text={comment.comment}
          />
        ))}
    </ul>
  );
};

export default CommentsList;
