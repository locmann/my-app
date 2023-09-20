import React from 'react';
import styles from './Navbar.module.css';
import { NavLink } from 'react-router-dom';

function Navbar() {
    return (
        <nav className={styles.app_nav}>
            <div className={styles.item}>
                <NavLink to='/profile' /* className={({ isActive }) => (isActive ? styles.active : 'inactive')} */>Profile</NavLink>
            </div>
            <div className={styles.item}>
                <NavLink to='/dialogs' /* className={({ isActive }) => (isActive ? styles.active : 'inactive')} */>Messages</NavLink>
            </div>
            <div className={styles.item}>
                <NavLink to='/news' /* className={({ isActive }) => (isActive ? styles.active : 'inactive')} */>News</NavLink>
            </div>
            <div className={styles.item}>
                <NavLink to='/music' /* className={({ isActive }) => (isActive ? styles.active : 'inactive')} */>Music</NavLink>
            </div>
            <div className={styles.item}>
                <NavLink to='/settings' /* className={({ isActive }) => (isActive ? styles.active : 'inactive')} */>Settings</NavLink>
            </div>
        </nav>
    );
}

export default Navbar;