import React from "react";
import { connect } from "react-redux";
import {
  setUsers,
  setCurPage,
  setTotalUsersCount,

  getUsers,
  getUsersOnChangedPage,
  followThunk,
  unfollowThunk,
} from "../../redux/usersReducer";
import Users from "./Users";
import Preloader from "../common/Preloader";

class UsersContainer extends React.Component {
  componentDidMount() {
    this.props.getUsers(this.props.currentPage, this.props.pageSize);
  }

  onPageChanged(pageNumber) {
    this.props.getUsersOnChangedPage(pageNumber, this.props.pageSize);
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
        />
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
    users: state.usersPage.users,
    pageSize: state.usersPage.pageSize,
    totalUsersCount: state.usersPage.totalUsersCount,
    currentPage: state.usersPage.currentPage,
    isFetching: state.usersPage.isFetching,
    followingInProgress: state.usersPage.followingInProgress,

  };
}

export default connect(mapStateToProps, {
  followThunk,
  unfollowThunk,
  setUsers,
  setCurPage,
  setTotalUsersCount,
  getUsers,
  getUsersOnChangedPage,
})(UsersContainer);
