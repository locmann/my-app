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
            let newMessage = {
                id: 2,
                message: state.newMsg
            };
            let stateCopy = {...state};
            stateCopy.messages = [...state.messages];
            stateCopy.messages.push(newMessage);
            stateCopy.newMsg = '';
            return stateCopy;
        }
        case (UPDATE_MESSAGE_DATA): {
            let stateCopy = {...state};
            stateCopy.newMsg = action.text;
            return stateCopy;
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