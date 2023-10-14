import React from "react";
import { addMessageActionCreator } from "../../redux/dialogsReducer.ts";
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
      dispatch(addMessageActionCreator(msg));
    },
  };
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withAuthRedirect
)(Dialogs);
