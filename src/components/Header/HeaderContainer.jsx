import React from "react";
import Header from "./Header";
import { connect } from "react-redux";
import { logoutThunk } from "../../redux/authReducer.ts";

class HeaderContainer extends React.Component {
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
  logoutThunk,
})(HeaderContainer);
