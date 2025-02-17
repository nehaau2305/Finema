'use client'
import React from 'react';
//import LoggedinUserTopBar from '../components/LoggedinUserTopBar'
import styles from './EditProfile.module.css'
import TopBar from '../components/TopBar';

export default function EditProfile() {
  return (
    <div className={styles.main_body}>
      <TopBar loggedIn={true} showEditProfile={false}/>
    </div>
  );
};