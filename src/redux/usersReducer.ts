import { type } from "os";
import { usersAPI } from "../api/api";
import { UserType } from "../components/types/types";
import { ThunkAction } from "redux-thunk";
import { BaseThunkType, InferActionsTypes } from "./reduxStore";

let initialState = {
  users: [] as Array<UserType>,
  pageSize: 4,
  totalUsersCount: 0,
  currentPage: 1,
  isFetching: false,
  followingInProgress: [] as Array<number>,
  filter: {
    term: "",
    friend: null as null | boolean,
  },
};

function usersReducer(
  state = initialState,
  action: ActionsTypes
): InitialStateType {
  switch (action.type) {
    case "FOLLOW": {
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
    case "UNFOLLOW": {
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
    case "SET_USERS": {
      return {
        ...state,
        users: action.users,
      };
    }
    case "SET_CURRENT_PAGE": {
      return {
        ...state,
        currentPage: action.currentPage,
      };
    }
    case "SET_TOTAL_USERS_COUNT": {
      return {
        ...state,
        totalUsersCount: action.totalUsersCount,
      };
    }
    case "SET_FETCHING_PRELOADER": {
      return {
        ...state,
        isFetching: action.isFetching,
      };
    }
    case "SET_FILTER": {
      return {
        ...state,
        filter: action.payload,
      };
    }
    case "TOGGLE_IS_FOLLOWING_PROGRESS": {
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

export const actions = {
  follow(userID: number) {
    return { type: "FOLLOW", userID } as const;
  },

  unfollow(userID: number) {
    return { type: "UNFOLLOW", userID } as const;
  },

  setUsers(users: Array<UserType>) {
    return { type: "SET_USERS", users } as const;
  },

  setFilter(filter: FilterType) {
    return { type: "SET_FILTER", payload: filter } as const;
  },

  setCurPage(currentPage: number) {
    return { type: "SET_CURRENT_PAGE", currentPage } as const;
  },

  setTotalUsersCount(number: number) {
    return { type: "SET_TOTAL_USERS_COUNT", totalUsersCount: number } as const;
  },

  setFetchingPreloader(isFetching: boolean) {
    return { type: "SET_FETCHING_PRELOADER", isFetching: isFetching } as const;
  },

  toggleFollowingProgress(isFetching: boolean, userId: number) {
    return {
      type: "TOGGLE_IS_FOLLOWING_PROGRESS",
      isFetching,
      userId,
    } as const;
  },
};

export function getUsers(
  currentPage: number,
  pageSize: number,
  filter: FilterType
): ThunkType {
  return (dispatch) => {
    dispatch(actions.setFetchingPreloader(true));

    dispatch(actions.setCurPage(currentPage));
    dispatch(actions.setFilter(filter));

    usersAPI
      .getUsers(currentPage, pageSize, filter.term, filter.friend)
      .then((data) => {
        dispatch(actions.setFetchingPreloader(false));
        dispatch(actions.setUsers(data.items));
        dispatch(actions.setTotalUsersCount(data.totalCount));
      });
  };
}

export function getUsersOnChangedPage(
  pageNumber: number,
  pageSize: number,
  filter: FilterType
): ThunkType {
  return (dispatch) => {
    dispatch(actions.setFetchingPreloader(true));
    dispatch(actions.setCurPage(pageNumber));
    usersAPI
      .getUsers(pageNumber, pageSize, filter.term, filter.friend)
      .then((data) => {
        dispatch(actions.setFetchingPreloader(false));
        dispatch(actions.setUsers(data.items));
      });
  };
}

export function getUsersSearch(
  currentPage: number,
  pageSize: number,
  filter: FilterType
): ThunkType {
  return (dispatch) => {
    console.log("1ew");

    dispatch(actions.setFetchingPreloader(true));
    dispatch(actions.setFilter(filter));
    dispatch(actions.setCurPage(currentPage));
    usersAPI.getUsers(currentPage, pageSize, filter.term).then((data) => {
      dispatch(actions.setUsers(data.items));
      dispatch(actions.setTotalUsersCount(data.totalCount));
      dispatch(actions.setFetchingPreloader(false));
    });
  };
}

export function followThunk(userId: number): ThunkType {
  return (dispatch) => {
    dispatch(actions.toggleFollowingProgress(true, userId));
    usersAPI.followPost(userId).then((data) => {
      if (data.resultCode == 0) {
        dispatch(actions.follow(userId));
      }
      dispatch(actions.toggleFollowingProgress(false, userId));
    });
  };
}

export function unfollowThunk(userId: number): ThunkType {
  return (dispatch) => {
    dispatch(actions.toggleFollowingProgress(true, userId));
    usersAPI.followDelete(userId).then((data) => {
      if (data.resultCode == 0) {
        dispatch(actions.unfollow(userId));
      }
      dispatch(actions.toggleFollowingProgress(false, userId));
    });
  };
}

export default usersReducer;

export type InitialStateType = typeof initialState;
export type FilterType = typeof initialState.filter;
type ActionsTypes = InferActionsTypes<typeof actions>;
type ThunkType = BaseThunkType<ActionsTypes>;
