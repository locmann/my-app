import { profileAPI, usersAPI } from "../api/api";
const ADD_POST = "ADD-POST";
const UPDATE_POST_DATA = "UPDATE-POST-DATA";
const SET_USER_PROFILE = "SET_USER_PROFILE";
const SET_PROFILE_STATUS = "SET_PROFILE_STATUS";

let initialState = {
  posts: [
    { id: 1, postMessage: "hello", likes: 3 },
    { id: 2, postMessage: "ti loh", likes: 10 },
  ],
  newPostText: "qwe",
  profile: null,
  status: "",
};

function profileReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_POST: {
      return {
        ...state,
        newPostText: action.text,
        posts: [...state.posts, { id: 3, postMessage: action.text, likes: 5 }],
      };
    }
    case UPDATE_POST_DATA: {
      return {
        ...state,
        newPostText: action.text,
      };
    }
    case SET_USER_PROFILE: {
      return {
        ...state,
        profile: action.profile,
      };
    }
    case SET_PROFILE_STATUS: {
      return {
        ...state,
        status: action.status,
      };
    }
    default:
      return state;
  }
}

export function addPostActionCreator(text) {
  return { type: ADD_POST, text };
}

export function updatePostActionCreator(text) {
  let action = {
    type: UPDATE_POST_DATA,
    text: text,
  };
  return action;
}

export function setUserProfile(profile) {
  return {
    type: SET_USER_PROFILE,
    profile,
  };
}

export function setStatusProfile(status) {
  return {
    type: SET_PROFILE_STATUS,
    status,
  };
}

export function getStatus(userId) {
  return (dispatch) => {
    profileAPI.getStatus(userId).then((response) => {
      dispatch(setStatusProfile(response.data));
      //console.log(data);//
    });
  };
}

export function updateStatus(status) {
  return (dispatch) => {
    profileAPI.updateStatus(status).then((response) => {
      if (response.data.resultCode === 0) {
        dispatch(setStatusProfile(status));
      }
      //console.log(data);//
    });
  };
}

export function profileThunk(profileId) {
  return (dispatch) => {
    usersAPI.setProfile(profileId).then((response) => {
      dispatch(setUserProfile(response.data));
      //console.log(data);//
    });
  };
}

export default profileReducer;
