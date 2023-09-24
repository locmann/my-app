import React from "react";
import styles from './Users.module.css'
import axios from "axios";
import userPhoto from '../../assets/images/user.png'

class Users extends React.Component {
    
    constructor(props) {
        
        super(props)
        

        axios.get('https://social-network.samuraijs.com/api/1.0/users').then(
            response => {
                this.props.setUsers(response.data.items)
            }
        )
        alert('qwe')
    }


    render() {
        return (
            <div>

                users
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