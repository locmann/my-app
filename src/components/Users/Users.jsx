import React from "react";
import styles from './Users.module.css'
import userPhoto from '../../assets/images/user.png'
import { NavLink } from "react-router-dom";
import { usersAPI } from "../../api/api";

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
                                <button disabled={props.followingInProgress.some(id => id === u.id)} onClick={() => {
                                    
                                    props.toggleFollowingProgress(true, u.id);
                                    usersAPI.followDelete(u.id).then(
                                        data => {
                                            if (data.resultCode == 0) {
                                                props.unfollow(u.id)
                                            }
                                            props.toggleFollowingProgress(false, u.id)
                                        }
                                    )
                                }}>unfollow</button>
                                : <button disabled={props.followingInProgress.some(id => id === u.id)} onClick={() => {
                                    props.toggleFollowingProgress(true, u.id)
                                    usersAPI.followPost(u.id).then(
                                        data => {
                                            if (data.resultCode == 0) {
                                                props.follow(u.id)
                                            }
                                            props.toggleFollowingProgress(false, u.id)
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