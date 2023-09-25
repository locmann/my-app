import React from "react";
import { connect } from "react-redux";
import { followAC, setUsersAC, unfollowAC, setCurPageAC, setTotalUsersCountAC } from "../../redux/usersReducer";
import axios from "axios";
import Users from "./Users";

class UsersContainer extends React.Component {
    componentDidMount() {
        axios.get(
            `https://social-network.samuraijs.com/api/1.0/users?page=
            ${this.props.currentPage}&count=${this.props.pageSize}`)
            .then(
                response => {
                    this.props.setUsers(response.data.items);
                    this.props.setTotalUsersCount(response.data.totalCount); 
                }
            )
    }

    onPageChanged(pageNumber) {
        this.props.setCurrentPage(pageNumber);
        axios.get(
            `https://social-network.samuraijs.com/api/1.0/users?page=
            ${pageNumber}&count=${this.props.pageSize}`)
            .then(
                response => {
                    this.props.setUsers(response.data.items);  
                }
            )
    }
    render() {
        return <Users totalUsersCount={this.props.totalUsersCount} pageSize={this.props.pageSize} 
        currentPage={this.props.currentPage} onPageChanged={this.onPageChanged.bind(this)} users={this.props.users}
        unfollow={this.props.unfollow} follow={this.props.follow} />
    }
}

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

export default connect(mapStateToProps, mapDispatchToProps)(UsersContainer);