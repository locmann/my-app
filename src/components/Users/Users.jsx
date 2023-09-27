import React from "react";
import styles from './Users.module.css'
import userPhoto from '../../assets/images/user.png'
import { NavLink } from "react-router-dom";
import axios from "axios";

function Users(props) {

    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    return (
        <div>
            <div>
                {pages.map(p => {
                    if (p === 1 || p === pagesCount || (p >= props.currentPage - 2 && p <= props.currentPage + 2)) {
                        return (
                            <span
                                key={p}
                                className={props.currentPage === p ? styles.selectedPage : ''}
                                onClick={() => {
                                    props.onPageChanged(p)
                                }}>{p} </span>
                        );
                    } else if (p === props.currentPage - 3 || p === props.currentPage + 3) {
                        return <span key={p}>... </span>;
                    } else {
                        return null;
                    }
                })}
            </div>

            <div>
                {props.users.map(u => <div>
                    <span>
                        <div>
                            <NavLink to={'/profile/' + u.id}>
                                <img src={u.photos.small != null ? u.photos.small : userPhoto}
                                    className={styles.ava} />
                            </NavLink>
                        </div>
                        <div>
                            {u.followed ?
                                <button onClick={() => {
                                    axios.delete(
                                        `https://social-network.samuraijs.com/api/1.0/follow/${u.id}`, {
                                            withCredentials: true,
                                            headers: {
                                                "API-KEY": "c44aa518-ff43-457d-b08f-4f3a76371829"
                                            }
                                        })
                                        .then(
                                            response => {
                                                if (response.data.resultCode == 0) {
                                                    props.unfollow(u.id)
                                                }
                                            }
                                        )
                                }}>unfollow</button>
                                : <button onClick={() => {
                                    axios.post(
                                        `https://social-network.samuraijs.com/api/1.0/follow/${u.id}`, {}, {
                                            withCredentials: true,
                                            headers: {
                                                "API-KEY": "c44aa518-ff43-457d-b08f-4f3a76371829"
                                            }
                                        })
                                        .then(
                                            response => {
                                                if (response.data.resultCode == 0) {
                                                    props.follow(u.id)
                                                }
                                            }
                                        )
                                }}>follow</button>}
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

export default Users;