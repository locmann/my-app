import React, { useEffect } from "react";
import styles from "./Users.module.css";
import userPhoto from "../../assets/images/user.png";
import { NavLink, Navigate } from "react-router-dom";
import UserSearch from "./UserSearch";
import Paginator from "./Paginator";
import {
  FilterType,
  followThunk,
  getUsers,
  getUsersOnChangedPage,
  unfollowThunk,
} from "../../redux/usersReducer";
import { useDispatch, useSelector } from "react-redux";
import {
  getCurrentPage,
  getFilter,
  getFollowingInProgress,
  getIsAuth,
  getPageSize,
  getTotalUsersCount,
  getUsersForSelector,
} from "../../redux/userSelectors";
import { AppDispatch } from "../../redux/reduxStore";

export const Users: React.FC = (props) => {
  const totalUsersCount = useSelector(getTotalUsersCount);
  const currentPage = useSelector(getCurrentPage);
  const pageSize = useSelector(getPageSize);
  const filter = useSelector(getFilter);
  const users = useSelector(getUsersForSelector);
  const isAuth = useSelector(getIsAuth);
  const followingInProgress = useSelector(getFollowingInProgress);

  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers(currentPage, pageSize, filter));
  }, []);
  const onPageChanged = (pageNumber: number) => {
    dispatch(getUsersOnChangedPage(pageNumber, pageSize, filter));
  };
  const onFilterChanged = (filter: FilterType) => {
    dispatch(getUsers(1, 4, filter));
  };
  const follow = (userID: number) => {
    dispatch(followThunk(userID));
  };
  const unfollow = (userID: number) => {
    dispatch(unfollowThunk(userID));
  };
  if (!isAuth) return <Navigate to="/login" />;

  return (
    <div>
      <Paginator
        totalUsersCount={totalUsersCount}
        pageSize={pageSize}
        currentPage={currentPage}
        onPageChanged={onPageChanged}
      />
      <UserSearch onFilterChanged={onFilterChanged} />
      <div>
        {users.map((u) => (
          <div>
            <span>
              <div>
                <NavLink to={"/profile/" + u.id}>
                  <img
                    src={u.photos.small != null ? u.photos.small : userPhoto}
                    className={styles.ava}
                  />
                </NavLink>
              </div>
              <div>
                {u.followed ? (
                  <button
                    disabled={followingInProgress.some((id) => id === u.id)}
                    onClick={() => {
                      unfollow(u.id);
                    }}
                  >
                    unfollow
                  </button>
                ) : (
                  <button
                    disabled={followingInProgress.some((id) => id === u.id)}
                    onClick={() => {
                      follow(u.id);
                    }}
                  >
                    follow
                  </button>
                )}
              </div>
            </span>
            <span>
              <span>
                <div>{u.name}</div>
                <div>{u.status}</div>
              </span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
