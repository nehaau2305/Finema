'use client'
import React, { useState } from 'react';
import styles from './ManageUsers.module.css'
import TopBar from '../components/TopBar';
import Button from '../components/Button';


export default function ManageUsers() {

  function foo() {
    console.log('PHEW!')
  }

  return (
    <div>
    <div className={styles.top}>
      <TopBar loggedIn={true} showEditProfile={false}/>
    </div>
    <section className={styles.main_body}>
        <section className={styles.promotion_info}>
          <div className={styles.input_section}>
            <h1> user </h1>
            <input></input>
          </div>

          <Button onClick={foo}> Add User </Button>
          </section>
        </section>
  </div>

  );
};