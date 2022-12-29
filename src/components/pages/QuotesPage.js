import React, { Fragment } from "react";
import { Outlet } from "react-router-dom";

const QuotesPage = () => {
  return (
    <Fragment>
      <Outlet />
    </Fragment>
  );
};

export default QuotesPage;
