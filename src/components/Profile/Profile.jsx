import React from 'react';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import MyPostsContainer from './MyPosts/MyPostsContainer';

function Profile(props) {
    
    return (
        <div>
            Content
            <ProfileInfo profile={props.profile} />
            <MyPostsContainer />
        </div>
    );
}

export default Profile;