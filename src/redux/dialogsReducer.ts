const ADD_MESSAGE = "ADD_MESSAGE";

type AddMessageActionType = {
  msg: string;
  type: typeof ADD_MESSAGE;
};

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

export type InitialStateType = typeof iniState;

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
  action: any
): InitialStateType {
  switch (action.type) {
    case ADD_MESSAGE: {
      //let message: string = action.msg;
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

export function addMessageActionCreator(msg: string): AddMessageActionType {
  let action: AddMessageActionType = {
    msg: msg,
    type: ADD_MESSAGE,
  };
  return action;
}

export default dialogsReducer;
