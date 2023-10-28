import React from "react";
import styles from "./Header.module.css";
import { NavLink } from "react-router-dom";
import { Avatar, Button, Col, Layout, Row } from "antd";

import { UserOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, AppStateType } from "../../redux/reduxStore";
import { isAuthSelector, loginSelector } from "../../redux/authSelectors";
import { logoutThunk } from "../../redux/authReducer";
/* export type PropsType = {
  isAuth: boolean | null;
  login: string | null;
  logoutThunk: () => void;
}; */

const Header: React.FC = () => {
  const isAuth = useSelector(isAuthSelector);
  const login = useSelector(loginSelector);

  const dispatch: AppDispatch = useDispatch();
  const logout = () => {
    dispatch(logoutThunk());
  };

  const { Header } = Layout;
  return (
    <Header /* style={{ display: "flex", alignItems: "center" }} */>
      <Row>
        <Col span={20}>
          <Avatar icon={<UserOutlined />} />
        </Col>
        <Col span={4}>
          {isAuth ? (
            <>
              <div style={{ color: "white" }}>
                {login}
                <Button onClick={logout}>logout</Button>
              </div>
            </>
          ) : (
            <Button>
              <NavLink to={"/login"}>Login</NavLink>
            </Button>
          )}
        </Col>
      </Row>
    </Header>
  );
};

{
  /* <header className={styles.app_header}>
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
    </header> */
}

export default Header;
