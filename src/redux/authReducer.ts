import { ThunkAction } from "redux-thunk";
import { StatusCode, usersAPI } from "../api/api";
import { AppStateType } from "./reduxStore";
const SET_USER_DATA = "SET_USER_DATA";
const SET_FETCHING_PRELOADER = "SET_FETCHING_PRELOADER";
const SET_ERROR = "SET_ERROR";
const GET_CAPTCHA = "GET_CAPTCHA";

let initialState = {
  id: null as number | null,
  email: null as string | null,
  login: null as string | null,
  isFetching: false as boolean | null,
  isAuth: false as boolean | null,
  error: "" as string | null,
  captcha: null as string | null,
};

export type InitialStateType = typeof initialState;

function authReducer(
  state = initialState,
  action: ActionType
): InitialStateType {
  switch (action.type) {
    case SET_USER_DATA: {
      return {
        ...state,
        ...action.data,
        //isAuth: true,
      };
    }
    case SET_ERROR: {
      return {
        ...state,
        error: action.error,
      };
    }
    case GET_CAPTCHA: {
      return {
        ...state,
        captcha: action.captcha,
      };
    }
    default:
      return state;
  }
}

type MainUserData = {
  id: number | null;
  email: string | null;
  login: string | null;
  isAuth: boolean;
};

type ActionType =
  | SetAuthUserData
  | GetCaptchaAC
  | SetFetchingPreloader
  | SetErrorAC;

type SetAuthUserData = {
  type: typeof SET_USER_DATA;
  data: MainUserData;
};

export function setAuthUserData(
  id: number | null,
  email: string | null,
  login: string | null,
  isAuth: boolean
): SetAuthUserData {
  return { type: SET_USER_DATA, data: { id, email, login, isAuth } };
}

type GetCaptchaAC = {
  type: typeof GET_CAPTCHA;
  captcha: string;
};

export function getCaptchaAC(captcha: string): GetCaptchaAC {
  return { type: GET_CAPTCHA, captcha };
}

type SetFetchingPreloader = {
  type: typeof SET_FETCHING_PRELOADER;
  isFetching: boolean;
};

export function setFetchingPreloader(
  isFetching: boolean
): SetFetchingPreloader {
  return { type: SET_FETCHING_PRELOADER, isFetching: isFetching };
}

type SetErrorAC = {
  type: typeof SET_ERROR;
  error: string;
};

export const setErrorAC = (error: string): SetErrorAC => ({
  type: SET_ERROR,
  error,
});

type ThunkType = ThunkAction<void, AppStateType, unknown, ActionType>;

export function authThunk(): ThunkType {
  return (dispatch) => {
    return usersAPI.getAuth().then((data) => {
      if (data.resultCode === StatusCode.Success) {
        let { id, login, email } = data.data;
        dispatch(setAuthUserData(id, login, email, true));
      }
    });
  };
}

export const loginThunk =
  (
    email: string,
    password: string,
    rememberMe: boolean,
    captcha: string
  ): ThunkType =>
  (dispatch) => {
    usersAPI.loginPost(email, password, rememberMe, captcha).then((data) => {
      if (data.resultCode === StatusCode.Success) {
        dispatch(authThunk());
      } else {
        if (data.resultCode === StatusCode.CaptchaIsRequired) {
          dispatch(getCaptchaUrl());
        }
        dispatch(setErrorAC(data.messages[0]));
      }
    });
  };

export const logoutThunk = (): ThunkType => (dispatch) => {
  usersAPI.logoutDelete().then((response) => {
    if (response.data.resultCode === 0) {
      dispatch(setAuthUserData(null, null, null, false));
    }
  });
};

export const getCaptchaUrl = (): ThunkType => (dispatch) => {
  usersAPI.getCaptcha().then((response) => {
    dispatch(getCaptchaAC(response.data.url));
  });
};

export default authReducer;
