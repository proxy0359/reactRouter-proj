import React from "react";
import style from "./MainNavigation.module.css";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <header className={style.header}>
      <h1 className={style.logo}>quotes</h1>
      <nav className={style.nav}>
        <ul>
          <li>
            <NavLink
              to="/quotes"
              className={(navData) => (navData.isActive ? style.active : "")}
            >
              AllQuotessss
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/add"
              className={(navData) => (navData.isActive ? style.active : "")}
            >
              Add Quote
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
