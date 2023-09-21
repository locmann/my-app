import React from 'react';
import { addPostActionCreator, updatePostActionCreator } from '../../../redux/profileReducer';
import MyPosts from './MyPosts';
import { connect } from 'react-redux';

function mapStateToProps(state) {
    return {
        profilePosts: state.profilePosts
    }
}

function mapDispatchToProps(dispatch) {
    return {
        updateNewPostText: (text) => {dispatch(updatePostActionCreator(text))},
        addPost: () => {dispatch(addPostActionCreator())}
    }    
}
const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts);

export default MyPostsContainer;