const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT';
const SET_FETCHING_PRELOADER = 'SET_FETCHING_PRELOADER';
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE_IS_FOLLOWING_PROGRESS';

let initialState = {
    users: [],
    pageSize: 4,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: []
}

function usersReducer(state = initialState, action) {
    switch (action.type) {
        case (FOLLOW): {
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userID) {
                        return {...u, followed: true}
                    }
                    return u;
                })
            }
        }
        case (UNFOLLOW): {
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userID) {
                        return {...u, followed: false}
                    }
                    return u;
                })
            }
        }
        case (SET_USERS): {
            return {
                ...state,
                //users: [...state.users, ...action.users]
                users: action.users                
            }
        }
        case (SET_CURRENT_PAGE): {
            return {
                ...state,
                currentPage: action.currentPage
            }
        }
        case (SET_TOTAL_USERS_COUNT): {
            return {
                ...state,
                totalUsersCount: action.totalUsersCount
            }
        }
        case (SET_FETCHING_PRELOADER): {
            return {
                ...state,
                isFetching: action.isFetching
            }
        }
        case (TOGGLE_IS_FOLLOWING_PROGRESS): {
            return {
                ...state,
                followingInProgress: action.isFetching
                ? [...state.followingInProgress, action.userId]
                : state.followingInProgress.filter(id => id != action.userId)
            }
        }
        default:
            return state;
    }
}

export function follow(userID) {
    return { type: FOLLOW, userID };
}

export function unfollow(userID) {
    return {type: UNFOLLOW, userID};
}

export function setUsers(users) {
    return {type: SET_USERS, users};
}

export function setCurPage(currentPage) {
    return {type: SET_CURRENT_PAGE, currentPage};
}

export function setTotalUsersCount(number) {
    return {type: SET_TOTAL_USERS_COUNT, totalUsersCount: number}
}

export function setFetchingPreloader(isFetching) {
    return {type: SET_FETCHING_PRELOADER, isFetching: isFetching}
}

export function toggleFollowingProgress(isFetching, userId) {
    return {type: TOGGLE_IS_FOLLOWING_PROGRESS, isFetching, userId}
}

export default usersReducer;