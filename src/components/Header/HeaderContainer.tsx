import React from "react";
import Header, { PropsType } from "./Header";
import { connect } from "react-redux";
import { logoutThunk } from "../../redux/authReducer";
import { AppStateType } from "../../redux/reduxStore";

class HeaderContainer extends React.Component<PropsType> {
  render() {
    return <Header {...this.props} />;
  }
}

function mapStateToProps(state: AppStateType) {
  return {
    isAuth: state.auth.isAuth,
    login: state.auth.login,
  };
}

export default connect(mapStateToProps, {
  logoutThunk,
})(HeaderContainer);
