import React from "react";
import {
  addPostActionCreator,
  updatePostActionCreator,
} from "../../../redux/profileReducer.ts";
import MyPosts from "./MyPosts";
import { connect } from "react-redux";

function mapStateToProps(state) {
  return {
    profilePosts: state.profilePosts,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addPost: (text) => {
      dispatch(addPostActionCreator(text));
    },
  };
}
const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts);

export default MyPostsContainer;
