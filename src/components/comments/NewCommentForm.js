import { useRef } from "react";
import { useState } from "react";

import classes from "./NewCommentForm.module.css";
import { makeComment } from "../util/api";
import { set } from "react-hook-form";
import { useParams } from "react-router-dom";

const NewCommentForm = (props) => {
  const [nameInput, setNameInput] = useState("");
  const [commentInput, setCommentInput] = useState("");
  const [nameInputError, setNameInputError] = useState(false);
  const [commentInputError, setCommentInputError] = useState(false);

  const param = useParams();

  //comment input handler
  const commentInputHandler = (event) => {
    setCommentInput(event.target.value);
  };

  //input Name Handler
  const inputNameHandler = (event) => {
    setNameInput(event.target.value);
  };
  const nameIsValid = nameInput && nameInput.trim().length !== 0;
  const commendIsValid = commentInput && commentInput.trim().length !== 0;

  //submit Handler

  const submitFormHandler = (event) => {
    event.preventDefault();

    if (!nameIsValid) {
      setNameInputError(true);
      return;
    }

    if (!commendIsValid) {
      setCommentInputError(true);
      return;
    }
    if (!nameIsValid && !commendIsValid) {
      return;
    }

    makeComment({
      id: param.id,
      name: nameInput,
      comment: commentInput,
    });

    setCommentInput("");
    setNameInput("");
    setCommentInputError(false);
    setNameInputError(false);

    props.hasBeenSent(false);
  };

  return (
    <form className={classes.form} onSubmit={submitFormHandler}>
      <div className={classes.control} onSubmit={submitFormHandler}>
        {nameInputError && <p className={classes.error}>Name is invalid</p>}
        <label htmlFor="name">Name</label>
        <input id="name" onChange={inputNameHandler} value={nameInput} />
        {commentInputError && (
          <p className={classes.error}>Comment Is Invalid</p>
        )}
        <label htmlFor="comment">Your Comment</label>
        <textarea
          id="comment"
          rows="3"
          onChange={commentInputHandler}
          value={commentInput}
        ></textarea>
      </div>
      <div className={classes.actions}>
        <button className="btn">Add Comment</button>
      </div>
    </form>
  );
};

export default NewCommentForm;
