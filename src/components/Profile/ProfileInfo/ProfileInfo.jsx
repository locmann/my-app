import React from "react";
import styles from "./ProfileInfo.module.css";
import Preloader from "../../common/Preloader";
import ProfileStatus from "./ProfileStatus";
import ProfileStatusHook from "./ProfileStatusHook";

function ProfileInfo(props) {
  if (!props.profile) {
    return <Preloader />;
  }
  return (
    <div className={styles.info}>
      <ProfileStatusHook
        status={props.status}
        updateStatus={props.updateStatus}
      />
      <div className={styles.pic}>
        <img src="back.jpg"></img>
      </div>
      <div className={styles.pic}>
        <img src={props.profile.photos.small}></img>
      </div>
    </div>
  );
}

export default ProfileInfo;
