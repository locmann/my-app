import React from "react";
import styles from "./MyPosts.module.css";
import Post from "./Post/Post";
import { useForm } from "react-hook-form";

function MyPosts(props) {
  function addPost(text) {
    props.addPost(text);
  }

  let newPost = props.profilePosts.posts.map((p) => (
    <Post message={p.postMessage} likes={p.likes} />
  ));

  const { register, handleSubmit, reset } = useForm();
  const onSubmit = (data) => {
    console.log(data.newPostText);
    addPost(data.newPostText);
    reset();
  };

  return (
    <div>
      <div className={styles.item}>my post</div>
      <div>
        {/* <textarea
          ref={newPostElement}
          onChange={onPostChange}
          value={props.profilePosts.newPostText}
        ></textarea>
        <button onClick={onAddPost}>Add post</button> */}

        <form onSubmit={handleSubmit(onSubmit)}>
          <input type="textarea" {...register("newPostText")} />
          <input value="Add post" type="submit" />
        </form>
      </div>

      {newPost}
    </div>
  );
}

export default MyPosts;
