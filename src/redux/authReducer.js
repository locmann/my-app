import { usersAPI } from "../api/api";
const SET_USER_DATA = "SET_USER_DATA";
const SET_FETCHING_PRELOADER = "SET_FETCHING_PRELOADER";
const SET_ERROR = "SET_ERROR";

let initialState = {
  id: null,
  email: null,
  login: null,
  isFetching: false,
  isAuth: false,
  error: "",
};

function authReducer(state = initialState, action) {
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
    default:
      return state;
  }
}
export function setAuthUserData(id, email, login, isAuth) {
  return { type: SET_USER_DATA, data: { id, email, login, isAuth } };
}

export function setFetchingPreloader(isFetching) {
  return { type: SET_FETCHING_PRELOADER, isFetching: isFetching };
}

export const setErrorAC = (error) => ({ type: SET_ERROR, error });

export function authThunk() {
  return (dispatch) => {
    return usersAPI.getAuth().then((response) => {
      if (response.data.resultCode === 0) {
        let { id, login, email } = response.data.data;
        dispatch(setAuthUserData(id, login, email, true));
      }
    });
  };
}

export const loginThunk =
  (email, password, rememberMe = false) =>
  (dispatch) => {
    usersAPI.loginPost(email, password, rememberMe).then((response) => {
      if (response.data.resultCode === 0) {
        dispatch(authThunk());
      } else {
        dispatch(setErrorAC(response.data.messages[0]));
      }
    });
  };

export const logoutThunk = () => (dispatch) => {
  usersAPI.logoutDelete().then((response) => {
    if (response.data.resultCode === 0) {
      dispatch(setAuthUserData(null, null, null, false));
    }
  });
};

export default authReducer;
