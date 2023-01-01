import { Fragment, useEffect, useState, useCallback, useMemo } from "react";

import QuoteItem from "./QuoteItem";
import classes from "./QuoteList.module.css";

import { getCommentData } from "../util/api";

import { Outlet, useNavigate, useLocation } from "react-router-dom";

let runThis = false;

const QuoteList = () => {
  const [quotes, setQuotes] = useState([]);

  const navigate = useNavigate();
  const location = useLocation();
  console.log(location);

  const queryParams = new URLSearchParams(location.search);
  console.log(queryParams);

  const isSortAscending = queryParams.get("sort") === "asc";

  const sortingHandler = () => {
    navigate({ search: `?sort=${isSortAscending ? "desc" : "asc"}` });
  };
  console.log(navigate);
  console.log(quotes);

  useEffect(() => {
    const data = async () => {
      const commentData = await getCommentData();
      setQuotes(commentData);
    };

    data();
  }, [setQuotes]);

  const sortedQuotes = useMemo(() => {
    if (queryParams.get("sort") === "asc") {
      return [...quotes].sort((a, b) => {
        if (a.author.toLowerCase() > b.author.toLowerCase()) {
          console.log("run a ");
          return 1;
        } else {
          console.log("run -1 on a");
          return -1;
        }
      });
    } else if (queryParams.get("sort") === "desc") {
      return [...quotes].reverse().sort((a, b) => {
        if (a.author.toLowerCase() < b.author.toLowerCase()) {
          console.log("run b ");
          return 1;
        } else {
          console.log("run 1 on b");
          return -1;
        }
      });
    } else {
      return [...quotes];
    }
  }, [queryParams, quotes]);

  // sorting code

  return (
    <Fragment>
      <div className={classes.sorting}>
        <button onClick={sortingHandler}>
          Sort {isSortAscending ? "Ascending" : "Descending"}
        </button>
      </div>
      <ul className={classes.list}>
        {sortedQuotes.map((quote) => (
          <QuoteItem
            key={quote.id}
            id={quote.id}
            author={quote.author}
            text={quote.text}
          />
        ))}
      </ul>

      <Outlet />
    </Fragment>
  );
};

export default QuoteList;
