import { AppStateType } from "./reduxStore";

export const isAuthSelector = (state: AppStateType) => {
  return state.auth.isAuth;
};

export const loginSelector = (state: AppStateType) => {
  return state.auth.login;
};
