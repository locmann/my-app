import { InferActionsTypes } from "./reduxStore";

type DialogsType = {
  id: number;
  name: string;
};

type MessagesType = {
  id: number;
  message: string;
};

let iniState = {
  dialogs: [] as Array<DialogsType>,
  messages: [] as Array<MessagesType>,
  newMsg: null as string | null,
};

let startState: InitialStateType = {
  dialogs: [
    { id: 1, name: "Denis" },
    { id: 2, name: "Vova" },
  ],
  messages: [
    { id: 1, message: "Hello" },
    { id: 2, message: "HI" },
  ],
  newMsg: "",
};

function dialogsReducer(
  state: InitialStateType = startState,
  action: ActionsType
): InitialStateType {
  switch (action.type) {
    case "ADD_MESSAGE": {
      let msgObj: MessagesType = {
        id: 2,
        message: action.msg,
      };
      let updatedState: InitialStateType = {
        ...state,
        newMsg: "",
        messages: [...state.messages, msgObj],
      };
      return updatedState;
    }
    default:
      return state;
  }
}

export const actions = {
  addMessageActionCreator: (msg: string) =>
    ({ type: "ADD_MESSAGE", msg } as const),
};

export default dialogsReducer;

export type InitialStateType = typeof iniState;
type ActionsType = InferActionsTypes<typeof actions>;
