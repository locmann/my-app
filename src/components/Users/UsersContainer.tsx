import React from "react";
import { connect } from "react-redux";
import {
  getUsers,
  getUsersOnChangedPage,
  followThunk,
  unfollowThunk,
  getUsersSearch,
  FilterType,
} from "../../redux/usersReducer";
import Users from "./Users";
import Preloader from "../common/Preloader";
import { compose } from "redux";
import { withAuthRedirect } from "../../hoc/withAuthRedirect.js";
import { UserType } from "../types/types";
import { AppStateType } from "../../redux/reduxStore";

type PropsType = MapStateToPropsType & MapDispatchToPropsType;

type MapStateToPropsType = {
  currentPage: number;
  pageSize: number;
  isFetching: boolean;
  totalUsersCount: number;
  users: Array<UserType>;
  followingInProgress: Array<number>;
  isAuth: boolean | null;
  filter: FilterType;
};

type MapDispatchToPropsType = {
  unfollowThunk: (userID: number) => void;
  followThunk: (userID: number) => void;
  getUsers: (currentPage: number, pageSize: number, filter: FilterType) => void;
  getUsersOnChangedPage: (
    pageNumber: number,
    pageSize: number,
    filter: FilterType
  ) => void;
};

class UsersContainer extends React.Component<PropsType> {
  componentDidMount() {
    const { currentPage, pageSize, filter } = this.props;
    console.log(getUsers);
    this.props.getUsers(currentPage, pageSize, filter);
  }

  onPageChanged(pageNumber: number) {
    this.props.getUsersOnChangedPage(
      pageNumber,
      this.props.pageSize,
      this.props.filter
    );
  }
  onFilterChanged(filter: FilterType) {
    debugger;
    this.props.getUsers(1, 4, filter);
  }

  render() {
    return (
      <>
        {this.props.isFetching ? <Preloader /> : null}
        <Users
          totalUsersCount={this.props.totalUsersCount}
          pageSize={this.props.pageSize}
          currentPage={this.props.currentPage}
          onPageChanged={this.onPageChanged.bind(this)}
          users={this.props.users}
          unfollow={this.props.unfollowThunk}
          follow={this.props.followThunk}
          followingInProgress={this.props.followingInProgress}
          isAuth={this.props.isAuth}
          onFilterChanged={this.onFilterChanged.bind(this)}
        />
      </>
    );
  }
}

function mapStateToProps(state: AppStateType): MapStateToPropsType {
  return {
    users: state.usersPage.users,
    pageSize: state.usersPage.pageSize,
    totalUsersCount: state.usersPage.totalUsersCount,
    currentPage: state.usersPage.currentPage,
    isFetching: state.usersPage.isFetching,
    followingInProgress: state.usersPage.followingInProgress,
    isAuth: state.auth.isAuth,
    filter: state.usersPage.filter,
  };
}

export default compose(
  connect<MapStateToPropsType, MapDispatchToPropsType, {}, AppStateType>(
    mapStateToProps,
    {
      followThunk,
      unfollowThunk,
      getUsers,
      getUsersOnChangedPage,
      //getUsersSearch,
    }
  )
)(UsersContainer);
