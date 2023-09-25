import React from "react";
import styles from './Users.module.css'
import axios from "axios";
import userPhoto from '../../assets/images/user.png'

class Users extends React.Component {



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
        let pagesCount = Math.ceil(this.props.totalUsersCount / this.props.pageSize);
        let pages = [];
        for (let i = 1; i <= pagesCount; i++) {
            pages.push(i)
        }
        
        return (
            <div>
                <div>
                    {pages.map(p => {
                         if (p === 1 || p === pagesCount || (p >= this.props.currentPage - 2 && p <= this.props.currentPage + 2)) {
                            return (
                                <span
                                    key={p}
                                    className={this.props.currentPage === p ? styles.selectedPage : ''}
                                    onClick={() => {
                                        this.onPageChanged(p)
                                    }}>{p} </span>
                            );
                        } else if (p === this.props.currentPage - 3 || p === this.props.currentPage + 3) {
                            return <span key={p}>... </span>;
                        } else {
                            return null;
                        }
                        /* return <span className={this.props.currentPage === p && styles.selectedPage}
                            onClick={(e)=> {this.onPageChanged(p)} }>
                            {p}
                        </span> */
                    })}
                </div>

                <div>
                    {this.props.users.map(u => <div>
                        <span>
                            <div>
                                <img src={u.photos.small != null ? u.photos.small : userPhoto}
                                    className={styles.ava} />
                            </div>
                            <div>
                                {u.followed ?
                                    <button onClick={() => { this.props.unfollow(u.id) }}>unfollow</button>
                                    : <button onClick={() => { this.props.follow(u.id) }}>follow</button>}
                            </div>
                        </span>
                        <span>
                            <span>
                                <div>
                                    {u.name}
                                </div>
                                <div>
                                    {u.status}
                                </div>
                            </span>


                        </span>
                    </div>)}
                </div>
            </div>
        )
    }
}

export default Users;