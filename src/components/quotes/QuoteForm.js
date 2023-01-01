import { useRef, useState } from "react";

import Card from "../UI/Card";
import LoadingSpinner from "../UI/LoadingSpinner";
import classes from "./QuoteForm.module.css";
import { sendComment } from "../util/api";

import { useParams } from "react-router-dom";

let sentMessage = false;

const QuoteForm = (props) => {
  const [authorInput, setAuthorInput] = useState("");
  const [textInput, setTextInput] = useState("");
  const [authIsTouched, setAuthorIsTouched] = useState(false);
  const [textIsTouched, setTextIsTouched] = useState(false);
  const [isError, setIsError] = useState(false);
  const [authorError, setAuthorError] = useState(false);
  const [textError, setTextError] = useState(false);
  const [sentMessage, setSentMessage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formFocus, setFormFocus] = useState(false);
  const param = useParams();

  const authorIsValid = authorInput.trim().length !== 0;

  const textIsValid = textInput.trim().length !== 0;
  const formIsValid = textIsValid && authorIsValid;

  const authorInputHandler = (event) => {
    setAuthorInput(event.target.value);
  };

  const textInputHandler = (event) => {
    setTextInput(event.target.value);
  };

  const authBlurHandler = () => {
    setAuthorIsTouched(true);
    setSentMessage(false);
    if (authorIsValid) setAuthorError(false);
    else setAuthorError(true);
  };

  const textBlurHandler = () => {
    setTextIsTouched(true);
    setSentMessage(false);
    if (textIsValid) setTextError(false);
    else setTextError(true);
  };

  // what a bummer ,   router 6.7 dosn't support usePrompt (gawa nalang custom hook wag kang tamad)

  const formFocusHandler = () => {
    setFormFocus(true);
  };

  const doneEditingHandler = () => {
    setFormFocus(false);
  };

  // Submit Handler

  async function submitFormHandler(event) {
    event.preventDefault();

    setIsLoading(true);

    if (!authorIsValid) {
      setAuthorError(true);

      setIsLoading(false);
    }
    if (!textIsValid) {
      setTextError(true);
      setIsLoading(false);
    }
    if (!formIsValid) {
      return;
    }

    // optional: Could validate here
    try {
      await sendComment({
        id: Date.now().toString(36) + Math.random().toString(36).substr(2),
        author: authorInput,
        text: textInput,
      });
    } catch (err) {
      return err;
    }
    setIsError(false);

    setTextInput("");
    setAuthorInput("");
    setSentMessage(true);

    setAuthorIsTouched(false);
    setTextIsTouched(false);
    setIsLoading(false);

    setAuthorError(false);
    setTextError(false);
  }

  let errorText;
  if (authorError && textError) {
    errorText = "Please enter a valid input";
  } else if (authorError) {
    errorText = "Invalid Author";
  } else if (textError) {
    errorText = "Invalid Text";
  }

  return (
    <Card>
      <form
        className={classes.form}
        onSubmit={submitFormHandler}
        onFocus={formFocusHandler}
      >
        {sentMessage && (
          <p className={classes.success} align="center">
            Quotes has been sent
          </p>
        )}
        {errorText && (
          <p className={classes.error} align="center">
            {errorText}
          </p>
        )}

        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <>
            <div className={classes.control}>
              <label htmlFor="author">Author</label>
              <input
                type="text"
                id="author"
                onChange={authorInputHandler}
                onBlur={authBlurHandler}
                value={authorInput}
              />
            </div>
            <div className={classes.control}>
              <label htmlFor="text">Text</label>
              <textarea
                id="text"
                rows="5"
                onChange={textInputHandler}
                onBlur={textBlurHandler}
                value={textInput}
              ></textarea>
            </div>

            <div className={classes.actions}>
              <button className="btn" onClick={doneEditingHandler}>
                Add Quote
              </button>
            </div>
          </>
        )}
      </form>
    </Card>
  );
};

export default QuoteForm;
