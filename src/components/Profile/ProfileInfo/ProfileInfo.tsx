import React, { ChangeEvent, useState } from "react";
import styles from "./ProfileInfo.module.css";
import Preloader from "../../common/Preloader";
import ProfileStatusHook from "./ProfileStatusHook";
import ava from "../../../assets/images/ava.jpg";
import ProfileDescriptionForm from "./ProfileDescriptionForm";
import { useSelector } from "react-redux";
import { AppStateType } from "../../../redux/reduxStore";
import { ContactsType, ProfileType } from "../../types/types";
import { ProfileInfoPropsType } from "../Profile";

const ProfileInfo: React.FC<ProfileInfoPropsType> = (props) => {
  const [editMode, setEditMode] = useState(false);
  const err = useSelector((state: AppStateType) => state.profilePosts.err);
  if (!props.profile) {
    return <Preloader />;
  }

  const onPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      props.savePhoto(e.target.files[0]);
    }
  };

  return (
    <div className={styles.info}>
      <ProfileStatusHook
        status={props.status}
        updateStatus={props.updateStatus}
      />
      <div className={styles.pic}>
        <img src={props.profile.photos.small || ava} className={styles.ava} />
        {props.isOwner && <input type="file" onChange={onPhotoSelected} />}
      </div>
      <div className={styles.description}>
        {editMode ? (
          <ProfileDescriptionForm
            profile={props.profile}
            goToEditMode={() => setEditMode(false)}
            updateUserProfile={props.updateUserProfile}
            err={err}
          />
        ) : (
          <ProfileDescription
            profile={props.profile}
            isOwner={props.isOwner}
            goToEditMode={() => setEditMode(true)}
            err={err}
          />
        )}
      </div>
    </div>
  );
};

type PropsType = {
  profile: ProfileType;
  isOwner: boolean;
  goToEditMode: () => void;
  err: string;
};

const ProfileDescription: React.FC<PropsType> = ({
  profile,
  isOwner,
  goToEditMode,
  err,
}) => {
  return (
    <>
      <div>Full name: {profile.fullName}</div>
      <div>Looking for a job: {profile.lookingForAJob ? "Yes" : "No"}</div>
      <div>Job description: {profile.lookingForAJobDescription}</div>
      <b>Contacts:</b>
      {Object.keys(profile.contacts).map((key) => {
        return (
          <Contacts
            key={key}
            contactTitle={key}
            contactValue={profile.contacts[key as keyof ContactsType]}
          />
        );
      })}
      {isOwner && (
        <button onClick={goToEditMode} className={styles.editButton}>
          edit
        </button>
      )}
      {err.length > 0 && <div>{err}</div>}
    </>
  );
};

type ContactsKeyValueType = {
  contactTitle: string;
  contactValue: string;
};

const Contacts: React.FC<ContactsKeyValueType> = ({
  contactTitle,
  contactValue,
}) => {
  return (
    <div className={styles.contact}>
      <b>{contactTitle}</b>: {contactValue}
    </div>
  );
};

export default ProfileInfo;
