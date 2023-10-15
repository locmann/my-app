import { type } from "os";
import { profileAPI, usersAPI } from "../api/api";
import { ProfileType, PhotosType } from "../components/types/types";
const ADD_POST = "ADD-POST";
const UPDATE_POST_DATA = "UPDATE-POST-DATA";
const SET_USER_PROFILE = "SET_USER_PROFILE";
const SET_PROFILE_STATUS = "SET_PROFILE_STATUS";
const SAVE_PHOTOS = "SAVE_PHOTOS";
const UPDATE_USER_PROFILE = "UPDATE_USER_PROFILE";
const UPDATE_ERROR_USER_PROFILE = "UPDATE_ERROR_USER_PROFILE";

type Post = {
  id: number;
  postMessage: string;
  likes: number;
};

let initialState = {
  posts: [
    { id: 1, postMessage: "hello", likes: 3 },
    { id: 2, postMessage: "ti loh", likes: 10 },
  ] as Array<Post>,
  newPostText: "" as string,
  profile: null as ProfileType | null, //!!!!
  status: "" as string,
  //photos: null,
  err: "" as string,
};

export type InitialStateType = typeof initialState;

function profileReducer(state = initialState, action: any): InitialStateType {
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
        profile:
          action.profile /* { ...action.profile, photos: { ...action.profile.photos } } */,
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
        profile: { ...state.profile, photos: action.photos } as ProfileType,
      };
    }
    case UPDATE_USER_PROFILE: {
      return {
        ...state,
        profile: {
          ...state.profile,
          ...action.profile,
          contacts: {
            /* ...state.profile.contacts, */ ...action.profile.contacts,
          },
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

type UpdateProfileAC = {
  type: typeof UPDATE_USER_PROFILE;
  profile: ProfileType;
};

export function updateProfileAC(profile: ProfileType): UpdateProfileAC {
  return { type: UPDATE_USER_PROFILE, profile };
}

type UpdateErrorProfileAC = {
  type: typeof UPDATE_ERROR_USER_PROFILE;
  err: string;
};

export function updateErrorProfileAC(err: string): UpdateErrorProfileAC {
  return { type: UPDATE_ERROR_USER_PROFILE, err };
}

type SetProfilePhoto = {
  type: typeof SAVE_PHOTOS;
  photos: PhotosType;
};

export function setProfilePhoto(photos: PhotosType): SetProfilePhoto {
  return { type: SAVE_PHOTOS, photos };
}

type AddPostActionCreator = {
  type: typeof ADD_POST;
  text: string;
};

export function addPostActionCreator(text: string): AddPostActionCreator {
  return { type: ADD_POST, text };
}

type UpdatePostActionCreator = {
  type: typeof UPDATE_POST_DATA;
  text: string;
};

export function updatePostActionCreator(text: string): UpdatePostActionCreator {
  return {
    type: UPDATE_POST_DATA,
    text,
  };
}

type SetUserProfile = {
  type: typeof SET_USER_PROFILE;
  profile: ProfileType;
};

export function setUserProfile(profile: ProfileType): SetUserProfile {
  console.log("profile");

  console.log(profile);

  return {
    type: SET_USER_PROFILE,
    profile,
  };
}

type SetStatusProfile = {
  type: typeof SET_PROFILE_STATUS;
  status: string;
};

export function setStatusProfile(status: string): SetStatusProfile {
  return {
    type: SET_PROFILE_STATUS,
    status,
  };
}

export function getStatus(userId: number) {
  return (dispatch: any) => {
    profileAPI.getStatus(userId).then((response) => {
      dispatch(setStatusProfile(response.data));
    });
  };
}

export function updateStatus(status: string) {
  return (dispatch: any) => {
    profileAPI.updateStatus(status).then((response) => {
      if (response.data.resultCode === 0) {
        dispatch(setStatusProfile(status));
      }
    });
  };
}

export function profileThunk(profileId: number) {
  return (dispatch: any) => {
    usersAPI.setProfile(profileId).then((response) => {
      dispatch(setUserProfile(response.data));
    });
  };
}

export function savePhoto(file: any) {
  return (dispatch: any) => {
    profileAPI.setPhoto(file).then((response) => {
      dispatch(setProfilePhoto(response.data.data.photos));
    });
  };
}

export function updateUserProfile(profile: ProfileType) {
  return (dispatch: any) => {
    profileAPI.updateProfile(profile).then((response) => {
      if (response.data.resultCode === 0) dispatch(updateProfileAC(profile));
      else dispatch(updateErrorProfileAC(response.data.messages[0]));
    });
  };
}

export default profileReducer;
