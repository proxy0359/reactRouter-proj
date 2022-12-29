import { useState } from "react";

import classes from "./Comments.module.css";
import NewCommentForm from "./NewCommentForm";
import CommentsList from "./CommentsList";
import { Route, Routes, useNavigate } from "react-router-dom";

const Comments = (props) => {
  const [isAddingComment, setIsAddingComment] = useState(false);
  const navigate = useNavigate();

  const startAddCommentHandler = () => {
    setIsAddingComment(true);
    navigate(`/quotes/${props.id}/comments`);
  };

  return (
    <section className={classes.comments}>
      <h2>User Comments</h2>
      {!isAddingComment && (
        <button className="btn" onClick={startAddCommentHandler}>
          Add a Comment
        </button>
      )}
      {isAddingComment && (
        <Routes>
          <Route
            path="comments"
            element={
              <>
                <CommentsList />
                <NewCommentForm hasBeenSent={setIsAddingComment} />
              </>
            }
          />
        </Routes>
      )}
    </section>
  );
};

export default Comments;
