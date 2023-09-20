import React from 'react';
import styles from './MyPosts.module.css';
import Post from './Post/Post';
import {addPostActionCreator, updatePostActionCreator} from '../../../redux/state';

function MyPosts(props) {
    let newPostElement = React.createRef();
    function addPost() {
        props.dispatch(addPostActionCreator());
    }

    function onPostChange() {
        let text = newPostElement.current.value;
        props.dispatch(updatePostActionCreator(text));
    }
    let newPost = props.posts.map(p => <Post message={p.postMessage} likes={p.likes}/>)
    return (
        <div>
            <div className={styles.item}>
                my post
            </div>
            <div>
                <textarea ref={newPostElement} onChange={onPostChange} value={props.text}></textarea>
                <button onClick={addPost}>Add post</button>
            </div>
            
            {newPost}
        </div>
    );
}

export default MyPosts;