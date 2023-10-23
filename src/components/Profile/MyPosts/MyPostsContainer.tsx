import React from "react";
import { actions } from "../../../redux/profileReducer";
import MyPosts from "./MyPosts";
import { connect } from "react-redux";
import { AppStateType } from "../../../redux/reduxStore";

function mapStateToProps(state: AppStateType) {
  return {
    profilePosts: state.profilePosts,
  };
}

function mapDispatchToProps(dispatch: any) {
  return {
    addPost: (text: string) => {
      dispatch(actions.addPostActionCreator(text));
    },
  };
}
const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts);

export default MyPostsContainer;
