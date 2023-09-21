import React from 'react';
import styles from './Profile.module.css';
import MyPosts from './MyPosts/MyPosts';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import MyPostsContainer from './MyPosts/MyPostsContainer';

function Profile(props) {
    
    return (
        <div>
            Content
            <ProfileInfo />
            <MyPostsContainer />
        </div>
    );
}

export default Profile;