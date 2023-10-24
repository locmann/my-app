import React from "react";
import { useForm } from "react-hook-form";
import styles from "./Login.module.css";
import { useDispatch, useSelector } from "react-redux";
import { loginThunk } from "../../redux/authReducer";
import { Navigate } from "react-router-dom";
import { AppDispatch, AppStateType } from "../../redux/reduxStore";

type FormDataType = {
  email: string;
  password: string;
  rememberMe: boolean;
  captcha: string;
};

export const Login: React.FC = () => {
  const isAuth = useSelector((state: AppStateType) => state.auth.isAuth);
  const error = useSelector((state: AppStateType) => state.auth.error);
  const captcha = useSelector((state: AppStateType) => state.auth.captcha);

  const dispatch: AppDispatch = useDispatch();

  const onSubmit = (formData: FormDataType) => {
    dispatch(
      loginThunk(
        formData.email,
        formData.password,
        formData.rememberMe,
        formData.captcha
      )
    );
  };

  return (
    <>
      {isAuth ? (
        <Navigate to="/profile" />
      ) : (
        <>
          <h1>LOGIN</h1>
          <LoginForm onSubmit={onSubmit} er={error} captcha={captcha} />
        </>
      )}
    </>
  );
};

type LoginFormPropsType = {
  onSubmit: (formData: FormDataType) => void;
  er: string | null;
  captcha: string | null;
};

function LoginForm(props: LoginFormPropsType) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormDataType>();

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

      {props.er !== null && <div className={styles.err}>{props.er}</div>}
      {props.captcha && <img src={props.captcha} />}
      {props.captcha && (
        <div>
          <input {...register("captcha", { required: true })} />
        </div>
      )}
      <input value="Login" type="submit" />
    </form>
  );
}
