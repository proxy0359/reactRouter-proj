import React, { Fragment } from "react";
import Header from "./Header";
import style from "./Layout.module.css";

const Layout = (props) => {
  return (
    <Fragment>
      <Header /> <main className={style.main}>{props.children}</main>
    </Fragment>
  );
};

export default Layout;
