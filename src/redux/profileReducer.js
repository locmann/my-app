const ADD_POST = 'ADD-POST';
const UPDATE_POST_DATA = 'UPDATE-POST-DATA';

function profileReducer(state, action) {
    switch (action.type) {
        case (ADD_POST):
            let newPost = {
                id: 3,
                postMessage: state.newPostText,
                likes: 5
            };
            state.posts.push(newPost);
            state.newPostText = '';
            return state;
        case (UPDATE_POST_DATA):
            state.newPostText = action.text;
            return state;
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