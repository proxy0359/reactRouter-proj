import CommentItem from "./CommentItem";
import classes from "./CommentsList.module.css";
import { getComment } from "../util/api";
import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

const CommentsList = () => {
  const [comments, setComments] = useState([]);
  const param = useParams();
  useEffect(() => {
    const data = async () => {
      const data = await getComment(param.id);
      console.log(param.id);
      setComments(data);
    };
    data();
  }, [setComments]);
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
