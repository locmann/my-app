import React from "react";
import { connect } from "react-redux";
import { follow, setUsers, unfollow, setCurPage, setTotalUsersCount, setFetchingPreloader } from "../../redux/usersReducer";
import Users from "./Users";
import Preloader from "../common/Preloader";
import { usersAPI } from "../../api/api";

class UsersContainer extends React.Component {
    componentDidMount() {
        this.props.setFetchingPreloader(true)
        usersAPI.getUsers(this.props.currentPage, this.props.pageSize)
        .then(
                data => {
                    this.props.setUsers(data.items);
                    this.props.setTotalUsersCount(data.totalCount);
                    this.props.setFetchingPreloader(false)
                }
            )
    }

    onPageChanged(pageNumber) {
        this.props.setFetchingPreloader(true)
        this.props.setCurPage(pageNumber);
        usersAPI.getUsers(pageNumber, this.props.pageSize).then(
                data => {
                    this.props.setFetchingPreloader(false)
                    this.props.setUsers(data.items);
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