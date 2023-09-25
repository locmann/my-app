import React from "react";
import { connect } from "react-redux";
import Users from "./Users";
import { followAC, setUsersAC, unfollowAC, setCurPageAC, setTotalUsersCountAC } from "../../redux/usersReducer";


function mapStateToProps(state) {
    
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage
    }
}

function mapDispatchToProps(dispatch) {
    return {
        follow: (userId) => {dispatch(followAC(userId))},
        unfollow: (userId) => {dispatch(unfollowAC(userId))},
        setUsers: (users) => {dispatch(setUsersAC(users))},
        setCurrentPage: (pageNum) => {dispatch(setCurPageAC(pageNum))},
        setTotalUsersCount: (number) => {dispatch(setTotalUsersCountAC(number))}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Users);