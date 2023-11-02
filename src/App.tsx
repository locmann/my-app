import "./App.css";
import React from "react";
import Navbar from "./components/Navbar/Navbar";
import { Routes, Route, BrowserRouter, NavLink } from "react-router-dom";
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import { UserPage } from "./components/Users/UsersContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";
import { Login } from "./components/Login/Login";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { compose } from "redux";
import { initialize } from "./redux/appReducer";
import Preloader from "./components/common/Preloader";
import { AppStateType } from "./redux/reduxStore";

import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Avatar, Breadcrumb, Col, Layout, Menu, Row, theme } from "antd";
import MenuItem from "antd/es/menu/MenuItem";
import SubMenu from "antd/es/menu/SubMenu";
import Header from "./components/Header/Header";
import { ChatPage } from "./pages/Chat/ChatPage";

const { Content, Sider } = Layout;

type MapPropsType = ReturnType<typeof mapStateToProps>;
type DispatchPropsType = {
  initialize: () => void;
};

class App extends React.Component<MapPropsType & DispatchPropsType> {
  componentDidMount() {
    //this.props.setFetchingPreloader(true)
    this.props.initialize();
    //this.props.logoutThunk();
  }

  render() {
    /* const {
      token: { colorBgContainer },
    } = theme.useToken(); */

    if (!this.props.initialized) {
      return <Preloader />;
    }

    return (
      <BrowserRouter>
        <Layout>
          <Header />
          <Layout>
            <Sider width={200} /* style={{ background: colorBgContainer }} */>
              <Menu
                mode="inline"
                defaultSelectedKeys={["1"]}
                defaultOpenKeys={["sub1"]}
                style={{ height: "100%", borderRight: 0 }}
              >
                <SubMenu key="sub1" icon={<UserOutlined />} title="Menu">
                  <MenuItem key="1">
                    <NavLink to="/profile">Profile</NavLink>
                  </MenuItem>
                  <MenuItem key="2">
                    <NavLink to="/dialogs">Messages</NavLink>
                  </MenuItem>
                  <MenuItem key="3">
                    <NavLink to="/news">News</NavLink>
                  </MenuItem>
                  <MenuItem key="4">
                    <NavLink to="/music">Music</NavLink>
                  </MenuItem>
                  <MenuItem key="5">
                    <NavLink to="/settings">Settings</NavLink>
                  </MenuItem>
                  <MenuItem key="6">
                    <NavLink to="/users">Users</NavLink>
                  </MenuItem>
                  <MenuItem key="7">
                    <NavLink to="/chat">Chat</NavLink>
                  </MenuItem>
                </SubMenu>
              </Menu>
            </Sider>
            <Layout style={{ padding: "0 24px 24px" }}>
              <Breadcrumb style={{ margin: "16px 0" }}>
                <Breadcrumb.Item>Home</Breadcrumb.Item>
                <Breadcrumb.Item>List</Breadcrumb.Item>
                <Breadcrumb.Item>App</Breadcrumb.Item>
              </Breadcrumb>
              <Content
                style={{
                  padding: 24,
                  margin: 0,
                  minHeight: 280,
                  /* background: colorBgContainer, */
                }}
              >
                <Routes>
                  <Route path="/dialogs/" element={<DialogsContainer />} />
                  <Route
                    path="/profile/:userId?"
                    element={<ProfileContainer />}
                  />
                  <Route path="/users" element={<UserPage />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/chat" element={<ChatPage />} />
                </Routes>
              </Content>
            </Layout>
          </Layout>
        </Layout>
      </BrowserRouter>
      // <BrowserRouter /* basename={process.env.PUBLIC_URL} */>
      //   <div className="App-wrapper">
      //     <HeaderContainer />
      //     <Navbar />
      //     <div className="App-wrapper-content">
      //       <Routes>
      //         <Route path="/dialogs/" element={<DialogsContainer />} />
      //         <Route path="/profile/:userId?" element={<ProfileContainer />} />
      //         <Route path="/users" element={<UserPage />} />
      //         <Route path="/login" element={<Login />} />
      //       </Routes>
      //     </div>
      //   </div>
      // </BrowserRouter>
    );
  }
}
export interface WithRouterProps {
  params: Record<string, string>;
}
const withRouter = <Props extends WithRouterProps>(
  Component: React.ComponentType<Props>
) => {
  const ComponentWithRouterProp = (
    props: Omit<Props, keyof WithRouterProps>
  ) => {
    let params = useParams();
    return <Component {...(props as Props)} router={{ params }} />;
  };
  return ComponentWithRouterProp;
};

const mapStateToProps = (state: AppStateType) => ({
  initialized: state.app.initialized,
});

export default compose(
  connect(mapStateToProps, { initialize }),
  withRouter
)(App);
