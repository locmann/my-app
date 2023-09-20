import React from 'react';
import styles from './ProfileInfo.module.css';

function ProfileInfo() {
    return (
        <div className={styles.info}>
            
            <div className={styles.pic}>
                <img src="back.jpg"></img>
            </div>
            <div className={styles.pic}>
                <img src="ava.jpg"></img>
            </div>
        </div>
    );
}

export default ProfileInfo;