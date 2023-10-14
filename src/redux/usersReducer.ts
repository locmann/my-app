import { type } from "os";
import { usersAPI } from "../api/api";
import { UserType } from "../components/types/types";
const FOLLOW = "FOLLOW";
const UNFOLLOW = "UNFOLLOW";
const SET_USERS = "SET_USERS";
const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
const SET_TOTAL_USERS_COUNT = "SET_TOTAL_USERS_COUNT";
const SET_FETCHING_PRELOADER = "SET_FETCHING_PRELOADER";
const TOGGLE_IS_FOLLOWING_PROGRESS = "TOGGLE_IS_FOLLOWING_PROGRESS";

let initialState = {
  users: [] as Array<UserType>,
  pageSize: 4,
  totalUsersCount: 0,
  currentPage: 1,
  isFetching: false,
  followingInProgress: [] as Array<number>,
};

export type InitialStateType = typeof initialState;

function usersReducer(state = initialState, action: any): InitialStateType {
  switch (action.type) {
    case FOLLOW: {
      return {
        ...state,
        users: state.users.map((u) => {
          if (u.id === action.userID) {
            return { ...u, followed: true };
          }
          return u;
        }),
      };
    }
    case UNFOLLOW: {
      return {
        ...state,
        users: state.users.map((u) => {
          if (u.id === action.userID) {
            return { ...u, followed: false };
          }
          return u;
        }),
      };
    }
    case SET_USERS: {
      return {
        ...state,
        users: action.users,
      };
    }
    case SET_CURRENT_PAGE: {
      return {
        ...state,
        currentPage: action.currentPage,
      };
    }
    case SET_TOTAL_USERS_COUNT: {
      return {
        ...state,
        totalUsersCount: action.totalUsersCount,
      };
    }
    case SET_FETCHING_PRELOADER: {
      return {
        ...state,
        isFetching: action.isFetching,
      };
    }
    case TOGGLE_IS_FOLLOWING_PROGRESS: {
      return {
        ...state,
        followingInProgress: action.isFetching
          ? [...state.followingInProgress, action.userId]
          : state.followingInProgress.filter((id) => id != action.userId),
      };
    }
    default:
      return state;
  }
}

type Follow = {
  type: typeof FOLLOW;
  userID: number;
};

export function follow(userID: number): Follow {
  return { type: FOLLOW, userID };
}
type Unfollow = {
  type: typeof UNFOLLOW;
  userID: number;
};
export function unfollow(userID: number): Unfollow {
  return { type: UNFOLLOW, userID };
}

type SetUsers = {
  type: typeof SET_USERS;
  users: UserType;
};

export function setUsers(users: UserType): SetUsers {
  return { type: SET_USERS, users };
}

type SetCurPage = {
  type: typeof SET_CURRENT_PAGE;
  currentPage: number;
};

export function setCurPage(currentPage: number): SetCurPage {
  return { type: SET_CURRENT_PAGE, currentPage };
}

type SetTotalUsersCount = {
  type: typeof SET_TOTAL_USERS_COUNT;
  totalUsersCount: number;
};

export function setTotalUsersCount(number: number): SetTotalUsersCount {
  return { type: SET_TOTAL_USERS_COUNT, totalUsersCount: number };
}

type SetFetchingPreloader = {
  type: typeof SET_FETCHING_PRELOADER;
  isFetching: boolean;
};

export function setFetchingPreloader(
  isFetching: boolean
): SetFetchingPreloader {
  return { type: SET_FETCHING_PRELOADER, isFetching: isFetching };
}

type ToggleFollowingProgress = {
  type: typeof TOGGLE_IS_FOLLOWING_PROGRESS;
  isFetching: boolean;
  userId: number;
};

export function toggleFollowingProgress(
  isFetching: boolean,
  userId: number
): ToggleFollowingProgress {
  return { type: TOGGLE_IS_FOLLOWING_PROGRESS, isFetching, userId };
}

export function getUsers(currentPage: number, pageSize: number) {
  return (dispatch: any) => {
    dispatch(setFetchingPreloader(true));
    usersAPI.getUsers(currentPage, pageSize).then((data) => {
      dispatch(setUsers(data.items));
      dispatch(setTotalUsersCount(data.totalCount));
      dispatch(setFetchingPreloader(false));
    });
  };
}

export function getUsersOnChangedPage(pageNumber: number, pageSize: number) {
  return (dispatch: any) => {
    dispatch(setFetchingPreloader(true));
    dispatch(setCurPage(pageNumber));
    usersAPI.getUsers(pageNumber, pageSize).then((data) => {
      dispatch(setFetchingPreloader(false));
      dispatch(setUsers(data.items));
    });
  };
}

export function followThunk(userId: number) {
  return (dispatch: any) => {
    dispatch(toggleFollowingProgress(true, userId));
    usersAPI.followPost(userId).then((response) => {
      if (response.data.resultCode == 0) {
        dispatch(follow(userId));
      }
      dispatch(toggleFollowingProgress(false, userId));
    });
  };
}

export function unfollowThunk(userId: number) {
  return (dispatch: any) => {
    dispatch(toggleFollowingProgress(true, userId));
    usersAPI.followDelete(userId).then((response) => {
      if (response.data.resultCode == 0) {
        dispatch(unfollow(userId));
      }
      dispatch(toggleFollowingProgress(false, userId));
    });
  };
}

export default usersReducer;
