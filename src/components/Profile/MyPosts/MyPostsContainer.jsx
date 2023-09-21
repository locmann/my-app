import React from 'react';
import { addPostActionCreator, updatePostActionCreator } from '../../../redux/profileReducer';
import MyPosts from './MyPosts';
import StoreContext from '../../../StoreContext';

function MyPostsContainer() {
    return (
        <StoreContext.Consumer>
            {
                (store) => {
                    let state = store.getState();
                    function addPost() {
                        store.dispatch(addPostActionCreator());
                    }

                    function onPostChange(text) {
                        store.dispatch(updatePostActionCreator(text));
                    }
                    return <MyPosts updateNewPostText={onPostChange} addPost={addPost}
                        posts={state.profilePosts.posts}
                        text={state.profilePosts.newPostText}
                    />
                }
            }
        </StoreContext.Consumer>
    );
}

export default MyPostsContainer;