import { ThunkAction } from "redux-thunk";
import { StatusCode, usersAPI } from "../api/api";
import { AppStateType, BaseThunkType, InferActionsTypes } from "./reduxStore";

let initialState = {
  id: null as number | null,
  email: null as string | null,
  login: null as string | null,
  isFetching: false as boolean | null,
  isAuth: false as boolean | null,
  error: "" as string | null,
  captcha: null as string | null,
};

function authReducer(
  state = initialState,
  action: ActionsType
): InitialStateType {
  switch (action.type) {
    case "SET_USER_DATA": {
      return {
        ...state,
        ...action.data,
        //isAuth: true,
      };
    }
    case "SET_ERROR": {
      return {
        ...state,
        error: action.error,
      };
    }
    case "GET_CAPTCHA": {
      return {
        ...state,
        captcha: action.captcha,
      };
    }
    default:
      return state;
  }
}

export const actions = {
  setAuthUserData: (
    id: number | null,
    email: string | null,
    login: string | null,
    isAuth: boolean
  ) => {
    return {
      type: "SET_USER_DATA",
      data: { id, email, login, isAuth },
    } as const;
  },
  getCaptchaAC: (captcha: string) => {
    return { type: "GET_CAPTCHA", captcha } as const;
  },
  setFetchingPreloader: (isFetching: boolean) => {
    return { type: "SET_FETCHING_PRELOADER", isFetching: isFetching } as const;
  },
  setErrorAC: (error: string) =>
    ({
      type: "SET_ERROR",
      error,
    } as const),
};

export function authThunk(): ThunkType {
  return (dispatch) => {
    return usersAPI.getAuth().then((data) => {
      if (data.resultCode === StatusCode.Success) {
        let { id, login, email } = data.data;
        dispatch(actions.setAuthUserData(id, login, email, true));
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
        dispatch(actions.setErrorAC(data.messages[0]));
      }
    });
  };

export const logoutThunk = (): ThunkType => (dispatch) => {
  usersAPI.logoutDelete().then((data) => {
    if (data.resultCode === 0) {
      dispatch(actions.setAuthUserData(null, null, null, false));
    }
  });
};

export const getCaptchaUrl = (): ThunkType => (dispatch) => {
  usersAPI.getCaptcha().then((data) => {
    dispatch(actions.getCaptchaAC(data.url));
  });
};

export default authReducer;

export type InitialStateType = typeof initialState;
type ActionsType = InferActionsTypes<typeof actions>;
type ThunkType = BaseThunkType<ActionsType>;
