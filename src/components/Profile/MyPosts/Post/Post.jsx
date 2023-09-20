import React from 'react';
import styles from './Post.module.css';

function Post(props) {
    return (
        <div className={styles.item}>
            {props.message} {props.likes}
        </div>
    );
}

export default Post;