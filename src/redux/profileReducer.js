const ADD_POST = 'ADD-POST';
const UPDATE_POST_DATA = 'UPDATE-POST-DATA';

let initialState = {
    posts: [
        { id: 1, postMessage: 'hello', likes: 3 },
        { id: 2, postMessage: 'ti loh', likes: 10 }
    ],
    newPostText: 'qwe'
}

function profileReducer(state = initialState, action) {
    switch (action.type) {
        case (ADD_POST): {
            
            return {
                ...state,
                newPostText: '',
                posts: [...state.posts, {id: 3, postMessage: state.newPostText, likes: 5}]
            };
        }    
        case (UPDATE_POST_DATA): {
            return {
                ...state,
                newPostText: action.text
            };
        }
        default:
            return state;
    }
}

export function addPostActionCreator() {
    return {type: ADD_POST}
}

export function updatePostActionCreator(text) {
    let action = {
        type: UPDATE_POST_DATA,
        text: text
    };
    return action;
}

export default profileReducer;