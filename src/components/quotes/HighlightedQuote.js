import { useState, useEffect, Fragment } from "react";
import classes from "./HighlightedQuote.module.css";
import { getCommentData } from "../util/api";

import { Route, Routes, useParams } from "react-router-dom";
import NoQuotesFound from "./NoQuotesFound";
import LoadingSpinner from "../UI/LoadingSpinner";
import Comments from "../comments/Comments";

const HighlightedQuote = (props) => {
  const [quotes, setQuotes] = useState([]);

  const [noQuotes, setNoQuotes] = useState(false);

  const id = useParams();

  console.log(id.id);

  useEffect(() => {
    const data = async () => {
      const commentData = await getCommentData();

      let data = [...commentData];
      const item = data.find((prev) => prev.id === id.id);
      console.log(item);
      if (!item) {
        console.log("this will run");
        setNoQuotes(true);
      } else {
        const latestItem = { text: item.text, author: item.author };

        setQuotes(latestItem);
      }
    };
    data();
  }, []);
  console.log(noQuotes);
  if (noQuotes) {
    return <NoQuotesFound />;
  }

  return (
    <Fragment>
      <figure className={classes.quote}>
        <p>{quotes.text}</p>
        <figcaption>{quotes.author}</figcaption>
      </figure>

      <Comments id={id.id} />
    </Fragment>
  );
};

export default HighlightedQuote;
