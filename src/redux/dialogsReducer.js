const ADD_MESSAGE = "ADD_MESSAGE";

let initialState = {
  dialogs: [
    { id: 1, name: "Denis" },
    { id: 2, name: "Vova" },
    { id: 3, name: "Ivan" },
  ],
  messages: [
    { id: 1, message: "Hello" },
    { id: 2, message: "HI" },
    { id: 3, message: "dota" },
  ],
  newMsg: "",
};

function dialogsReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_MESSAGE: {
      let message = action.msg;
      return {
        ...state,
        newMsg: "",
        messages: [...state.messages, { id: 2, message }],
      };
    }
    default:
      return state;
  }
}

export function addMessageActionCreator(msg) {
  return { type: ADD_MESSAGE, msg };
}

export default dialogsReducer;
