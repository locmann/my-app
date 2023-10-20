import { authThunk } from "./authReducer";
import { InferActionsTypes } from "./reduxStore";

export type InitialStateType = typeof initialState;

type ActionsType = InferActionsTypes<typeof actions>;

let initialState = {
  initialized: false,
};

function appReducer(
  state: InitialStateType = initialState,
  action: ActionsType
): InitialStateType {
  switch (action.type) {
    case "IS_INI": {
      return {
        ...state,
        initialized: true,
      };
    }
    default:
      return state;
  }
}

export const actions = {
  setIni: () => {
    return { type: "IS_INI" } as const;
  },
};
export const initialize = () => (dispatch: any) => {
  let promise = dispatch(authThunk());
  promise.then(() => dispatch(actions.setIni()));
};

export default appReducer;
