import React from 'react';
import styles from './ProfileInfo.module.css';
import Preloader from '../../common/Preloader';
import ProfileStatus from './ProfileStatus';

function ProfileInfo(props) {
    if (!props.profile) {
        return <Preloader />
    }

    return (
        <div className={styles.info}>
            <ProfileStatus status="hello world"/>
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