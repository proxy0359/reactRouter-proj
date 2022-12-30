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
  const [sentMessage, setSentMessage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formFocus, setFormFocus] = useState(false);
  const param = useParams();
  console.log(param);

  const authorIsValid = authorInput.trim() !== "";

  const textIsValid = textInput.trim() !== "";

  const authorInputHandler = (event) => {
    setAuthorInput(event.target.value);
  };

  const textInputHandler = (event) => {
    setTextInput(event.target.value);
  };

  const authBlurHandler = () => {
    setAuthorIsTouched(true);
    setSentMessage(false);
  };

  const textBlurHandler = () => {
    setTextIsTouched(true);
    setSentMessage(false);
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
      console.log("Please enter a valid output");
      setIsError(true);
      return;
    }
    if (!textIsValid) {
      console.log("Please enter a valid output");
      setIsError(true);
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
      throw err;
    }
    setIsError(false);

    setTextInput("");
    setAuthorInput("");
    setSentMessage(true);

    setAuthorIsTouched(false);
    setTextIsTouched(false);
    setIsLoading(false);
  }

  return (
    <Card>
      <form
        className={classes.form}
        onSubmit={submitFormHandler}
        onFocus={formFocusHandler}
      >
        {sentMessage && <p>Quotes has been sent</p>}
        {isLoading && (
          <div className={classes.loading}>
            <LoadingSpinner />
          </div>
        )}

        {isError && <p>Please enter a valid input</p>}

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
      </form>
    </Card>
  );
};

export default QuoteForm;
