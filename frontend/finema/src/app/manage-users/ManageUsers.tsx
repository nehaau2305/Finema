'use client'
import React, { useState } from 'react';
import { useRouter } from 'next/navigation'
import { useToken } from '../components/useToken'
import styles from './ManageUsers.module.css'
import TopBar from '../components/TopBar';
import Button from '../components/Button';


export default function ManageUsers() {
  const router = useRouter()
  const [token, setToken] = useToken('');
  if (token === 'null') {
    router.push('/web-user-home')
  }

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