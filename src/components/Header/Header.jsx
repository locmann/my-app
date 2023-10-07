import React from "react";
import styles from "./Header.module.css";
import { NavLink } from "react-router-dom";

function Header(props) {
  return (
    <header className={styles.app_header}>
      <img src="favicon.ico" />
      <div className={styles.loginBlock}>
        {props.isAuth ? (
          <>
            {props.login}
            <button onClick={props.logoutThunk}>logout</button>
          </>
        ) : (
          <NavLink to={"/login"}>Login</NavLink>
        )}
      </div>
    </header>
  );
}

export default Header;
