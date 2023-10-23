import React from "react";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import { ProfileType } from "../types/types";

export type ProfileInfoPropsType = {
  profile: ProfileType | null;
  savePhoto: (file: File) => void;
  status: string;
  updateStatus: (status: string) => void;
  isOwner: boolean;
  updateUserProfile: (profile: ProfileType) => void;
};

const Profile: React.FC<ProfileInfoPropsType> = (props) => {
  return (
    <div>
      Content
      <ProfileInfo
        profile={props.profile}
        status={props.status}
        updateStatus={props.updateStatus}
        isOwner={props.isOwner}
        savePhoto={props.savePhoto}
        updateUserProfile={props.updateUserProfile}
      />
      <MyPostsContainer />
    </div>
  );
};

export default Profile;
