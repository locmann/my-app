import React from "react";
import styles from "./ProfileInfo.module.css";
import Preloader from "../../common/Preloader";
import ProfileStatusHook from "./ProfileStatusHook";
import ava from "../../../assets/images/ava.jpg";

function ProfileInfo(props) {
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
    </div>
  );
}

export default ProfileInfo;
