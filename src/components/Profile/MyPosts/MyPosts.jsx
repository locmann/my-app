import React from "react";
import styles from "./MyPosts.module.css";
import Post from "./Post/Post";
import { Controller, useForm } from "react-hook-form";

function MyPosts(props) {
  function addPost(text) {
    props.addPost(text);
  }

  let newPost = props.profilePosts.posts.map((p) => (
    <Post message={p.postMessage} likes={p.likes} />
  ));

  const {
    handleSubmit,
    reset,
    formState: { errors },
    control,
  } = useForm();
  const onSubmit = (data) => {
    //console.log(data.newPostText);
    addPost(data.newPostText);
    reset();
  };
  console.log("RENDER");
  console.log(props);
  return (
    <div>
      <div className={styles.item}>my post</div>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="newPostText"
            control={control}
            defaultValue=""
            rules={{
              required: "cant be empty",
              minLength: {
                value: 2,
                message: "must be at least 2 characters long.",
              },
              maxLength: {
                value: 100,
                message: "must not exceed 100 characters.",
              },
            }}
            render={({ field }) => (
              <div>
                <input {...field} type="text" id="newPostText" />
                {errors.newPostText && (
                  <p className={styles.err}>{errors.newPostText.message}</p>
                )}
              </div>
            )}
          />
          <input value="Add post" type="submit" />
        </form>
      </div>
      {newPost}
    </div>
  );
}

export default MyPosts;
