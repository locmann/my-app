import React from "react";
import { useForm } from "react-hook-form";
import styles from "./Login.module.css";
import { usersAPI } from "../../api/api";

function Login(props) {
  return (
    <>
      <h1>LOGIN</h1>
      <LoginForm />
    </>
  );
}

function LoginForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    console.log(data.login);
    console.log(data.password);
    usersAPI
      .loginPost({ login: data.login, password: data.password })
      .then((response) => {});
    reset();
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input placeholder="Login" {...register("login", { required: true })} />
      <div>
        {errors.login && (
          <span className={styles.err}>This field is required</span>
        )}
      </div>
      <input
        placeholder="Password"
        {...register("password", { required: true })}
      />
      <div>
        {errors.exampleRequired && (
          <span className={styles.err}>This field is required</span>
        )}
      </div>
      <div>
        <input type="checkbox" {...register("rememberMe")} /> Remember me
      </div>
      <input value="Login" type="submit" />
    </form>
  );
}

export default Login;
