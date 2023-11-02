import { ThunkAction } from "redux-thunk";
import { StatusCode, usersAPI } from "../api/api";
import { AppStateType, BaseThunkType, InferActionsTypes } from "./reduxStore";
import { ChatMessageType, chatAPI } from "../api/chatAPI";
import { message } from "antd";
import { Dispatch } from "redux";

let initialState = {
  messages: [] as ChatMessageType[],
};

function chatReducer(
  state = initialState,
  action: ActionsType
): InitialStateType {
  switch (action.type) {
    case "SET_MESSAGES": {
      return {
        ...state,
        messages: [...state.messages, ...action.payload.messages],
      };
    }
    default:
      return state;
  }
}

export const actions = {
  setMessages: (messages: ChatMessageType[]) => {
    return {
      type: "SET_MESSAGES",
      payload: { messages },
    } as const;
  },
};

let _newMessageHandler: ((messages: ChatMessageType[]) => void) | null = null;

const newMessagesHandler = (dispatch: Dispatch) => {
  if (_newMessageHandler === null) {
    _newMessageHandler = (messages) => {
      dispatch(actions.setMessages(messages));
    };
  }
  return _newMessageHandler;
};

export function startMessagesListening(): ThunkType {
  return (dispatch) => {
    chatAPI.start();
    chatAPI.subscribe(newMessagesHandler(dispatch));
  };
}

export function endMessagesListening(): ThunkType {
  return (dispatch) => {
    chatAPI.unsubscribe(newMessagesHandler(dispatch));
    chatAPI.stop();
  };
}

export function sendMessage(message: string): ThunkType {
  return (dispatch) => {
    return chatAPI.sendMessage(message);
  };
}

export default chatReducer;

export type InitialStateType = typeof initialState;
type ActionsType = InferActionsTypes<typeof actions>;
type ThunkType = BaseThunkType<ActionsType>;
