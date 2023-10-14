import { type } from "os";
import { usersAPI } from "../api/api";
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

function authReducer(state = initialState, action: any): InitialStateType {
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

export function authThunk() {
  return (dispatch: any) => {
    return usersAPI.getAuth().then((response) => {
      if (response.data.resultCode === 0) {
        let { id, login, email } = response.data.data;
        dispatch(setAuthUserData(id, login, email, true));
      }
    });
  };
}

export const loginThunk =
  (email: string, password: string, rememberMe: boolean, captcha: string) =>
  (dispatch: any) => {
    usersAPI
      .loginPost(email, password, rememberMe, captcha)
      .then((response) => {
        if (response.data.resultCode === 0) {
          dispatch(authThunk());
        } else {
          if (response.data.resultCode === 10) {
            dispatch(getCaptchaUrl());
          }
          dispatch(setErrorAC(response.data.messages[0]));
        }
      });
  };

export const logoutThunk = () => (dispatch: any) => {
  usersAPI.logoutDelete().then((response) => {
    if (response.data.resultCode === 0) {
      dispatch(setAuthUserData(null, null, null, false));
    }
  });
};

export const getCaptchaUrl = () => (dispatch: any) => {
  usersAPI.getCaptcha().then((response) => {
    dispatch(getCaptchaAC(response.data.url));
  });
};

export default authReducer;
