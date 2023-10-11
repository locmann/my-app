import React, { useState } from "react";
import styles from "./ProfileInfo.module.css";
import Preloader from "../../common/Preloader";
import ProfileStatusHook from "./ProfileStatusHook";
import ava from "../../../assets/images/ava.jpg";
import ProfileDescriptionForm from "./ProfileDescriptionForm";
import { useSelector } from "react-redux";

function ProfileInfo(props) {
  const [editMode, setEditMode] = useState(false);
  const err = useSelector((state) => state.profilePosts.err);
  if (!props.profile) {
    return <Preloader />;
  }

  const onPhotoSelected = (e) => {
    if (e.target.files.length) {
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
}

const ProfileDescription = ({ profile, isOwner, goToEditMode, err }) => {
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
            contactValue={profile.contacts[key]}
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

const Contacts = ({ contactTitle, contactValue }) => {
  return (
    <div className={styles.contact}>
      <b>{contactTitle}</b>: {contactValue}
    </div>
  );
};

export default ProfileInfo;
