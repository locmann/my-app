import React from "react";
import styles from "./Users.module.css";
import userPhoto from "../../assets/images/user.png";
import { NavLink, Navigate } from "react-router-dom";
import { UserType } from "../types/types";
import UserSearch from "./UserSearch";
import Paginator from "./Paginator";
import { FilterType } from "../../redux/usersReducer";

type PropsType = {
  totalUsersCount: number;
  pageSize: number;
  isAuth: boolean | null;
  currentPage: number;
  onPageChanged: (pageNumber: number) => void;
  users: Array<UserType>;
  unfollow: (userID: number) => void;
  follow: (userID: number) => void;
  followingInProgress: Array<number>;
  onFilterChanged: (filter: FilterType) => void;
};

let Users: React.FC<PropsType> = (props) => {
  if (!props.isAuth) return <Navigate to="/login" />;
  return (
    <div>
      <Paginator
        totalUsersCount={props.totalUsersCount}
        pageSize={props.pageSize}
        currentPage={props.currentPage}
        onPageChanged={props.onPageChanged}
      />
      <UserSearch onFilterChanged={props.onFilterChanged} />
      <div>
        {props.users.map((u) => (
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
                    disabled={props.followingInProgress.some(
                      (id) => id === u.id
                    )}
                    onClick={() => {
                      props.unfollow(u.id);
                    }}
                  >
                    unfollow
                  </button>
                ) : (
                  <button
                    disabled={props.followingInProgress.some(
                      (id) => id === u.id
                    )}
                    onClick={() => {
                      props.follow(u.id);
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

export default Users;
