import React from 'react';
import { Navigate } from "react-router-dom";
import ProfileInfo from './ProfileInfo/ProfileInfo';
import MyPostsContainer from './MyPosts/MyPostsContainer';

function Profile(props) {
    if (!props.isAuth) return <Navigate to="/login" />
    return (
        <div>
            Content
            <ProfileInfo profile={props.profile} />
            <MyPostsContainer />
        </div>
    );
}

export default Profile;