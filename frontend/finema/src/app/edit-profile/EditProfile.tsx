'use client'
import React, { useState } from 'react';
import { useRouter } from 'next/navigation'
import { useToken } from '../components/useToken'
import styles from './EditProfile.module.css'
import TopBar from '../components/TopBar';
import Button from '../components/Button';


export default function EditProfile() {
  const router = useRouter()
  const [token, setToken] = useToken('');
  if (token === 'null') {
    router.push('/web-user-home')
  }
  const [selectedValue, setSelectedValue] = useState(false);

  function foo() {
    console.log('PHEW!')
  }

  const handleRadioChange = (value:boolean) => {
    setSelectedValue(value);
  };
  return (
    <div>
      <div className={styles.top}>
        <TopBar loggedIn={true} showEditProfile={false}/>
      </div>
      <section className={styles.main_body}>
        <section className={styles.personal_promotion}>
          <section className={styles.personal}>
            <div className={styles.input_section}>
              <h1> Name </h1>
              <input></input>
            </div>
            <div className={styles.input_section}>
              <h1> Phone Number </h1>
              <input></input>
            </div>
            <div className={styles.input_section}>
              <h1> Email </h1>
              <input></input>
            </div>
            <div className={styles.address_field}>
              <h1> Home Address </h1>
              <input></input>
              <input></input>
              <input></input>
            </div>
            <Button onClick={foo}> Update Information </Button>
          </section>
          <section className={styles.promotion}>
            <div>
              <h2> Subscribe for email Promotions </h2>
              <input
                type="radio"
                value='true'
                checked={selectedValue === true}
                onChange={() => handleRadioChange(true)}
              />
            </div>
            <div>
              <h2> Unsubscribe from email Promotions </h2>
              <input
                type="radio"
                value='false'
                checked={selectedValue === false}
                onChange={() =>handleRadioChange(false)}
              />
            </div>
          </section>
        </section>
        <section className={styles.password_card}>
          <section className={styles.password}>
            <h2> Change Password </h2>
            <div className={styles.input_section}>
              <h1> Current Password </h1>
              <input></input>
            </div>
            <div className={styles.input_section}>
              <h1> New Password </h1>
              <input></input>
            </div>
            <div className={styles.input_section}>
              <h1> Confirm New Password </h1>
              <input></input>
            </div>
            <Button onClick={foo}> Change Password </Button>
          </section>
          <section className={styles.card}>
            <h2> Payment Information </h2>
            <div className={styles.input_section}>
              <h1> Card Number </h1>
              <input></input>
            </div>
            <div className={styles.input_section}>
              <h1> Expiration Date </h1>
              <input></input>
            </div>
            <div className={styles.address_field}>
              <h1> Billing Address </h1>
              <input></input>
              <input></input>
              <input></input>
            </div>
            <Button onClick={foo}> Add Card </Button>
          </section>
        </section>
      </section>
    </div>
  );
};