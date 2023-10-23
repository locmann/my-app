import "./App.css";
import React from "react";
import Navbar from "./components/Navbar/Navbar";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import UsersContainer from "./components/Users/UsersContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import Login from "./components/Login/Login";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { compose } from "redux";
import { initialize } from "./redux/appReducer";
import Preloader from "./components/common/Preloader";
import { AppStateType } from "./redux/reduxStore";

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
    if (!this.props.initialized) {
      return <Preloader />;
    }

    return (
      <BrowserRouter /* basename={process.env.PUBLIC_URL} */>
        <div className="App-wrapper">
          <HeaderContainer />
          <Navbar />
          <div className="App-wrapper-content">
            <Routes>
              <Route path="/dialogs/" element={<DialogsContainer />} />
              <Route path="/profile/:userId?" element={<ProfileContainer />} />
              <Route path="/users" element={<UsersContainer />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
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
