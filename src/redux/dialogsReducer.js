const ADD_MESSAGE = 'ADD_MESSAGE';
const UPDATE_MESSAGE_DATA = 'UPDATE_MESSAGE_DATA';

let initialState = {
    dialogs: [
        { id: 1, name: "Denis" },
        { id: 2, name: "Vova" },
        { id: 3, name: "Ivan" }
    ],
    messages: [
        { id: 1, message: "Hello" },
        { id: 2, message: "HI" },
        { id: 3, message: "dota" }
    ],
    newMsg: ''
};

function dialogsReducer(state = initialState, action) {
    switch (action.type) {
        case (ADD_MESSAGE): {
            let message = state.newMsg;
            return {
                ...state,
                newMsg: '',
                messages: [...state.messages, {id: 2, message}]
            };
        }
        case (UPDATE_MESSAGE_DATA): {
            return {
                ...state,
                newMsg: action.text
            };
        }
        default:
            return state;
    }
}

export function addMessageActionCreator() {
    return {type: ADD_MESSAGE}
}

export function updateMessageActionCreator(text) {
    return {type: UPDATE_MESSAGE_DATA, text: text}
}

export default dialogsReducer;