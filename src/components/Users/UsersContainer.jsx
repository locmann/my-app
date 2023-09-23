import React from "react";
import { connect } from "react-redux";
import Users from "./Users";
import { followAC, setUsersAC, unfollowAC } from "../../redux/usersReducer";


function mapStateToProps(state) {
    
    return {
        users: state.usersPage.users
    }
}

function mapDispatchToProps(dispatch) {
    return {
        follow: (userId) => {dispatch(followAC(userId))},
        unfollow: (userId) => {dispatch(unfollowAC(userId))},
        setUsers: (users) => {dispatch(setUsersAC(users))}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Users);