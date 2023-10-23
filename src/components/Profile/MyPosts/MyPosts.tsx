import React from "react";
import styles from "./MyPosts.module.css";
import Post from "./Post/Post";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import {
  InitialStateType,
  PostType as PostType,
} from "../../../redux/profileReducer";

type formValues = {
  newPostText: string;
};

type OwnPropsType = {
  addPost: (text: string) => void;
  profilePosts: InitialStateType;
};

function MyPosts(props: OwnPropsType) {
  function addPost(text: string) {
    props.addPost(text);
  }

  let newPost = props.profilePosts.posts.map((p: PostType) => (
    <Post id={p.id} postMessage={p.postMessage} likes={p.likes} />
  ));

  const {
    handleSubmit,
    reset,
    formState: { errors },
    control,
  } = useForm<formValues>();
  const onSubmit: SubmitHandler<formValues> = (data) => {
    addPost(data.newPostText);
    reset();
  };

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
