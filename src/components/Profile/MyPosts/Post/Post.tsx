import React from "react";
import styles from "./Post.module.css";

import { PostType } from "../../../../redux/profileReducer";

function Post(props: PostType) {
  return (
    <div className={styles.item}>
      {props.postMessage} {props.likes}
    </div>
  );
}

export default Post;
