import { profileAPI } from "../api/api";
import { ProfileType, PhotosType } from "../components/types/types";
import { ThunkAction } from "redux-thunk";
import { BaseThunkType, InferActionsTypes } from "./reduxStore";

export type PostType = {
  id: number;
  postMessage: string;
  likes: number;
};

let initialState = {
  posts: [
    { id: 1, postMessage: "hello", likes: 3 },
    { id: 2, postMessage: "hi", likes: 10 },
  ] as Array<PostType>,
  newPostText: "" as string,
  profile: null as ProfileType | null,
  status: "" as string,
  err: "" as string,
};

function profileReducer(
  state = initialState,
  action: ActionsType
): InitialStateType {
  switch (action.type) {
    case "ADD_POST": {
      return {
        ...state,
        newPostText: action.text,
        posts: [...state.posts, { id: 3, postMessage: action.text, likes: 5 }],
      };
    }
    case "UPDATE_POST_DATA": {
      return {
        ...state,
        newPostText: action.text,
      };
    }
    case "SET_USER_PROFILE": {
      return {
        ...state,
        profile: action.profile,
      };
    }
    case "SET_PROFILE_STATUS": {
      return {
        ...state,
        status: action.status,
      };
    }
    case "SAVE_PHOTOS": {
      return {
        ...state,
        profile: { ...state.profile, photos: action.photos } as ProfileType,
      };
    }
    case "UPDATE_USER_PROFILE": {
      return {
        ...state,
        profile: {
          ...state.profile,
          ...action.profile,
          contacts: {
            ...action.profile.contacts,
          },
        },
      };
    }
    case "UPDATE_ERROR_USER_PROFILE": {
      return {
        ...state,
        err: action.err,
      };
    }
    default:
      return state;
  }
}

export const actions = {
  updateProfileAC: (profile: ProfileType) => {
    return { type: "UPDATE_USER_PROFILE", profile } as const;
  },
  updateErrorProfileAC: (err: string) => {
    return { type: "UPDATE_ERROR_USER_PROFILE", err } as const;
  },
  setProfilePhoto: (photos: PhotosType) => {
    return { type: "SAVE_PHOTOS", photos } as const;
  },
  addPostActionCreator: (text: string) => {
    return { type: "ADD_POST", text } as const;
  },
  updatePostActionCreator: (text: string) => {
    return {
      type: "UPDATE_POST_DATA",
      text,
    } as const;
  },
  setUserProfile: (profile: ProfileType) => {
    return {
      type: "SET_USER_PROFILE",
      profile,
    } as const;
  },
  setStatusProfile: (status: string) => {
    return {
      type: "SET_PROFILE_STATUS",
      status,
    } as const;
  },
};

export function getStatus(userId: number): ThunkType {
  return (dispatch) => {
    profileAPI.getStatus(userId).then((data) => {
      dispatch(actions.setStatusProfile(data));
    });
  };
}

export function updateStatus(status: string): ThunkType {
  return (dispatch) => {
    profileAPI.updateStatus(status).then((data) => {
      if (data.resultCode === 0) {
        dispatch(actions.setStatusProfile(status));
      }
    });
  };
}

export function profileThunk(profileId: number): ThunkType {
  return (dispatch) => {
    profileAPI.setProfile(profileId).then((data) => {
      dispatch(actions.setUserProfile(data));
    });
  };
}

export function savePhoto(file: File): ThunkType {
  return (dispatch) => {
    profileAPI.setPhoto(file).then((data) => {
      dispatch(actions.setProfilePhoto(data.data.photos));
    });
  };
}

export function updateUserProfile(profile: ProfileType): ThunkType {
  return (dispatch) => {
    profileAPI.updateProfile(profile).then((data) => {
      if (data.resultCode === 0) dispatch(actions.updateProfileAC(profile));
      else dispatch(actions.updateErrorProfileAC(data.messages[0]));
    });
  };
}

export default profileReducer;

export type InitialStateType = typeof initialState;
type ActionsType = InferActionsTypes<typeof actions>;
type ThunkType = BaseThunkType<ActionsType>;
