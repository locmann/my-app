import { usersAPI } from "../api/api";
const SET_USER_DATA = "SET_USER_DATA";
const SET_FETCHING_PRELOADER = "SET_FETCHING_PRELOADER";

let initialState = {
  id: null,
  email: null,
  login: null,
  isFetching: false,
  isAuth: false,
};

function authReducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER_DATA: {
      return {
        ...state,
        ...action.data,
        isAuth: true,
      };
    }
    default:
      return state;
  }
}
export function setAuthUserData(id, email, login) {
  return { type: SET_USER_DATA, data: { id, email, login } };
}

export function setFetchingPreloader(isFetching) {
  return { type: SET_FETCHING_PRELOADER, isFetching: isFetching };
}

export function authThunk() {
  return (dispatch) => {
    usersAPI.getAuth().then((data) => {
      if (data.resultCode === 0) {
        let { id, login, email } = data.data;
        dispatch(setAuthUserData(id, login, email));
      }
    });
  };
}

export default authReducer;
