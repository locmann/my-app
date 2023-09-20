import React from 'react';
import { addPostActionCreator, updatePostActionCreator } from '../../../redux/profileReducer';
import MyPosts from './MyPosts';

function MyPostsContainer(props) {
    let state = props.store.getState();

    function addPost() {
        props.store.dispatch(addPostActionCreator());
    }

    function onPostChange(text) {
        props.store.dispatch(updatePostActionCreator(text));
    }

    return (
        <MyPosts updateNewPostText={onPostChange} addPost={addPost} posts={state.profilePosts.posts}
            text={state.profilePosts.newPostText}
        />
    );
}

export default MyPostsContainer;