import { Fragment, useMemo } from "react";

import QuoteItem from "./QuoteItem";
import classes from "./QuoteList.module.css";

import { getCommentData } from "../util/api";

import {
  Outlet,
  useNavigate,
  useLocation,
  useLoaderData,
} from "react-router-dom";

const QuoteList = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const data = useLoaderData();

  const queryParams = new URLSearchParams(location.search);
  console.log(queryParams);

  const isSortAscending = queryParams.get("sort") === "asc";
  const queryGet = queryParams.get("sort");

  const sortingHandler = () => {
    navigate({ search: `?sort=${isSortAscending ? "desc" : "asc"}` });
  };
  console.log(navigate);
  console.log(data);

  const sortedQuotes = useMemo(() => {
    if (queryGet === "asc") {
      return [...data].sort((a, b) => {
        if (a.author.toLowerCase() > b.author.toLowerCase()) {
          console.log("run a ");
          return 1;
        } else {
          console.log("run -1 on a");
          return -1;
        }
      });
    } else if (queryGet === "desc") {
      return [...data].reverse().sort((a, b) => {
        if (a.author.toLowerCase() < b.author.toLowerCase()) {
          console.log("run b ");
          return 1;
        } else {
          console.log("run 1 on b");
          return -1;
        }
      });
    } else {
      return [...data];
    }
  }, [queryGet, data]);

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

export const loader = () => {
  return getCommentData();
};
