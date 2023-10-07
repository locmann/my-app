import React from "react";
import Header from "./Header";
import { connect } from "react-redux";
import {
  authThunk,
  setAuthUserData,
  setFetchingPreloader,
  logoutThunk,
} from "../../redux/authReducer";

class HeaderContainer extends React.Component {
  componentDidMount() {
    //this.props.setFetchingPreloader(true)
    this.props.authThunk();
    this.props.logoutThunk();
  }
  render() {
    return <Header {...this.props} />;
  }
}

function mapStateToProps(state) {
  return {
    isAuth: state.auth.isAuth,
    login: state.auth.login,
  };
}

export default connect(mapStateToProps, {
  setAuthUserData,
  authThunk,
  logoutThunk,
})(HeaderContainer);
