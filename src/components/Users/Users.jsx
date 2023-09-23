import React from "react";
import styles from './Users.module.css'
import axios from "axios";
import userPhoto from '../../assets/images/user.png'


function Users(props) {
    if (props.users.length === 0) {
        axios.get('https://social-network.samuraijs.com/api/1.0/users').then(
            response => {
                props.setUsers(response.data.items)
            }
        )
    }
    return (
        <div>
            users
            <div>
                {props.users.map(u => <div>
                    <span>
                        <div>
                            <img src={u.photos.small != null ? u.photos.small : userPhoto}
                                className={styles.ava} />
                        </div>
                        <div>
                            {u.followed ? <button onClick={() => { props.unfollow(u.id) }}>unfollow</button>
                                : <button onClick={() => { props.follow(u.id) }}>follow</button>}
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
                        {/* <span>
                            <div>
                                {u.location.city}
                            </div>
                            <div>
                                {u.location.country}
                            </div>
                        </span> */}

                    </span>
                </div>)}
            </div>
        </div>

    )
}

export default Users;