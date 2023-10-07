import { authThunk } from "./authReducer";

const IS_INI = "IS_INI";

let initialState = {
  initialized: false,
};

function appReducer(state = initialState, action) {
  switch (action.type) {
    case IS_INI: {
      return {
        ...state,
        initialized: true,
      };
    }
    default:
      return state;
  }
}
export function setIni() {
  return { type: IS_INI };
}

export const initialize = () => (dispatch) => {
  let promise = dispatch(authThunk());

  promise.then(() => dispatch(setIni()));
};

export default appReducer;
