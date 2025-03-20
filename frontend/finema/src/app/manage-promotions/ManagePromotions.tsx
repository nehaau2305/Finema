'use client'
import React, { useState } from 'react';
import { useRouter } from 'next/navigation'
import { useToken } from '../components/useToken'
import styles from './ManagePromotions.module.css'
import TopBar from '../components/TopBar';
import Button from '../components/Button';


export default function ManagePromotions() {
  const router = useRouter()
  const [token, setToken] = useToken();
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
            <h1> promotion name </h1>
            <input></input>
            <h1> ticket type </h1>
            <select name="ticket type" id="tickettype">
              <option value="child">child</option>
              <option value="adult">adult</option>
              <option value="senior">senior</option>
            </select>
            <h1> discount </h1>
            <input></input>
            <h1> movie </h1>
            <input></input>
            <h1> date effective </h1>
            <input type="date" id="date" name="date"></input>


          </div>

          <Button onClick={foo}> Add Promotion </Button>
          </section>
        </section>
  </div>

  );
};