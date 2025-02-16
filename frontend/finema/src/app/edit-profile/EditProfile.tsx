'use client'
import React from 'react';
import LoggedinUserTopBar from '../components/LoggedinUserTopBar'
import styles from './EditProfile.module.css'

export default function EditProfile() {
  return (
    <div className={styles.main_body}>
      <LoggedinUserTopBar />
    </div>
  );
};