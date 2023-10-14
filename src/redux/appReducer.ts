import { type } from "os";

import { authThunk } from "./authReducer";
const IS_INI = "IS_INI";

export type InitialStateType = {
  initialized: boolean;
};

let initialState: InitialStateType = {
  initialized: false,
};

function appReducer(
  state: InitialStateType = initialState,
  action: any
): InitialStateType {
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

type setIniAC = {
  type: typeof IS_INI;
};

export function setIni(): setIniAC {
  return { type: IS_INI };
}

export const initialize = () => (dispatch: any) => {
  let promise = dispatch(authThunk());
  promise.then(() => dispatch(setIni()));
};

export default appReducer;
