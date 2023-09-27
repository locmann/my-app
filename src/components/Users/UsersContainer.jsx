import React from "react";
import { connect } from "react-redux";
import { follow, setUsers, unfollow, setCurPage, setTotalUsersCount, setFetchingPreloader } from "../../redux/usersReducer";
import axios from "axios";
import Users from "./Users";
import Preloader from "../common/Preloader";

class UsersContainer extends React.Component {
    componentDidMount() {
        this.props.setFetchingPreloader(true)
        axios.get(
            `https://social-network.samuraijs.com/api/1.0/users?page=
            ${this.props.currentPage}&count=${this.props.pageSize}`, {
                withCredentials: true
            })
            .then(
                response => {
                    this.props.setUsers(response.data.items);
                    this.props.setTotalUsersCount(response.data.totalCount);
                    this.props.setFetchingPreloader(false)
                }
            )
    }

    onPageChanged(pageNumber) {
        this.props.setFetchingPreloader(true)
        this.props.setCurPage(pageNumber);
        axios.get(
            `https://social-network.samuraijs.com/api/1.0/users?page=
            ${pageNumber}&count=${this.props.pageSize}`, {
                withCredentials: true
            })
            .then(
                response => {
                    this.props.setFetchingPreloader(false)
                    this.props.setUsers(response.data.items);
                }
            )
    }
    render() {
        return <>
            {this.props.isFetching ? <Preloader />: null}
            <Users totalUsersCount={this.props.totalUsersCount} pageSize={this.props.pageSize}
                currentPage={this.props.currentPage} onPageChanged={this.onPageChanged.bind(this)} users={this.props.users}
                unfollow={this.props.unfollow} follow={this.props.follow} />
        </>
    }
}

function mapStateToProps(state) {

    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching
    }
}

export default connect(mapStateToProps, {
    follow,
    unfollow,
    setUsers,
    setCurPage,
    setTotalUsersCount,
    setFetchingPreloader
    
})(UsersContainer);