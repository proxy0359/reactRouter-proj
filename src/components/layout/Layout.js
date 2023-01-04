import React, { Fragment } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import style from "./Layout.module.css";

const Layout = (props) => {
  return (
    <Fragment>
      <Header />
      <main className={style.main}>
        <Outlet />
      </main>
    </Fragment>
  );
};

export default Layout;
