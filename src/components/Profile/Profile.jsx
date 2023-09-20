import React from 'react';
import styles from './Profile.module.css';
import MyPosts from './MyPosts/MyPosts';
import ProfileInfo from './ProfileInfo/ProfileInfo';

function Profile(props) {
    
    return (
        <div>
            Content
            <ProfileInfo />
            <MyPosts text={props.profile.newPostText}
                posts={props.profile.posts} dispatch={props.dispatch} />
        </div>
    );
}

export default Profile;