import React from "react";
import { actions } from "../../redux/dialogsReducer.ts";
import Dialogs from "./Dialogs";
import { connect } from "react-redux";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";
import { compose } from "redux";

function mapStateToProps(state) {
  return {
    dialogs: state.msgPage,
    //isAuth: state.auth.isAuth
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addMessage: (msg) => {
      dispatch(actions.addMessageActionCreator(msg));
    },
  };
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withAuthRedirect
)(Dialogs);
