import React from "react";
import { useForm } from "react-hook-form";
import styles from "./Login.module.css";
import { usersAPI } from "../../api/api";
import { connect } from "react-redux";
import { loginThunk } from "../../redux/authReducer";
import { Navigate } from "react-router-dom";

function Login(props) {
  const onSubmit = (formData) => {
    props.loginThunk(formData.email, formData.password, formData.rememberMe);
  };

  return (
    <>
      {props.isAuth ? (
        <Navigate to="/profile" />
      ) : (
        <>
          <h1>LOGIN</h1>
          <LoginForm onSubmit={onSubmit} />
        </>
      )}
    </>
  );
}

function LoginForm(props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  return (
    <form onSubmit={handleSubmit(props.onSubmit)}>
      <input placeholder="Email" {...register("email", { required: true })} />
      <div>
        {errors.email && (
          <span className={styles.err}>This field is required</span>
        )}
      </div>
      <input
        type="password"
        placeholder="Password"
        {...register("password", { required: true })}
      />
      <div>
        {errors.password && (
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

const mapStateToProps = (state) => ({ isAuth: state.auth.isAuth });

export default connect(mapStateToProps, { loginThunk })(Login);
