import { profileAPI, usersAPI } from "../api/api";
const ADD_POST = "ADD-POST";
const UPDATE_POST_DATA = "UPDATE-POST-DATA";
const SET_USER_PROFILE = "SET_USER_PROFILE";
const SET_PROFILE_STATUS = "SET_PROFILE_STATUS";
const SAVE_PHOTOS = "SAVE_PHOTOS";
const UPDATE_USER_PROFILE = "UPDATE_USER_PROFILE";
const UPDATE_ERROR_USER_PROFILE = "UPDATE_ERROR_USER_PROFILE";

let initialState = {
  posts: [
    { id: 1, postMessage: "hello", likes: 3 },
    { id: 2, postMessage: "ti loh", likes: 10 },
  ],
  newPostText: "qwe",
  profile: null,
  status: "",
  photos: null,
  err: "",
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
    case SAVE_PHOTOS: {
      return {
        ...state,
        profile: { ...state.profile, photos: action.photos },
      };
    }
    case UPDATE_USER_PROFILE: {
      return {
        ...state,
        profile: {
          ...state.profile,
          ...action.profile,
          contacts: { ...state.profile.contacts, ...action.profile.contacts },
          //...state.profile,
          //contacts: { ...action.profile.contacts },
        },
      };
    }
    case UPDATE_ERROR_USER_PROFILE: {
      return {
        ...state,
        err: action.err,
      };
    }
    default:
      return state;
  }
}

export function updateProfileAC(profile) {
  return { type: UPDATE_USER_PROFILE, profile };
}
export function updateErrorProfileAC(err) {
  return { type: UPDATE_ERROR_USER_PROFILE, err };
}
export function setProfilePhoto(photos) {
  return { type: SAVE_PHOTOS, photos };
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
    });
  };
}

export function updateStatus(status) {
  return (dispatch) => {
    profileAPI.updateStatus(status).then((response) => {
      if (response.data.resultCode === 0) {
        dispatch(setStatusProfile(status));
      }
    });
  };
}

export function profileThunk(profileId) {
  return (dispatch) => {
    usersAPI.setProfile(profileId).then((response) => {
      dispatch(setUserProfile(response.data));
    });
  };
}

export function savePhoto(file) {
  return (dispatch) => {
    profileAPI.setPhoto(file).then((response) => {
      dispatch(setProfilePhoto(response.data.data.photos));
    });
  };
}

export function updateUserProfile(profile) {
  return (dispatch) => {
    profileAPI.updateProfile(profile).then((response) => {
      if (response.data.resultCode === 0) dispatch(updateProfileAC(profile));
      else dispatch(updateErrorProfileAC(response.data.messages[0]));
    });
  };
}

export default profileReducer;
