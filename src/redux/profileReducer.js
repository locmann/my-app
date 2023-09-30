import { usersAPI } from "../api/api";
const ADD_POST = 'ADD-POST';
const UPDATE_POST_DATA = 'UPDATE-POST-DATA';
const SET_USER_PROFILE = 'SET_USER_PROFILE';

let initialState = {
    posts: [
        { id: 1, postMessage: 'hello', likes: 3 },
        { id: 2, postMessage: 'ti loh', likes: 10 }
    ],
    newPostText: 'qwe',
    profile: null
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
        case (SET_USER_PROFILE): {
            return {
                ...state,
                profile: action.profile
            }
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

export function setUserProfile(profile) {
    return {
        type: SET_USER_PROFILE,
        profile
    }
}

export function profileThunk(profileId) {
    return (dispatch) => {
        usersAPI.setProfile(profileId).then((data) => {
            dispatch(setUserProfile(data));
            console.log(data);
        })
    }

}

export default profileReducer;