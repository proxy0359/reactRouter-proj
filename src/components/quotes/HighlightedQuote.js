import { useState, useEffect, Fragment } from "react";
import classes from "./HighlightedQuote.module.css";
import { getCommentData, getSingleQuote } from "../util/api";

import { Route, Routes, useLoaderData, useParams } from "react-router-dom";
import NoQuotesFound from "./NoQuotesFound";
import LoadingSpinner from "../UI/LoadingSpinner";
import Comments from "../comments/Comments";

const HighlightedQuote = () => {
  const data = useLoaderData();
  console.log(data);
  console.log("Asdfsafdasdf");
  return (
    <Fragment>
      <figure className={classes.quote}>
        <p>{data.text}</p>
        <figcaption>{data.author}</figcaption>
      </figure>

      <Comments id={data} />
    </Fragment>
  );
};

export default HighlightedQuote;

export const loader = ({ params }) => {
  console.log(params);
  const { id } = params;

  return getSingleQuote(id);
};
