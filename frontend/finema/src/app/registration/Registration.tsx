'use client'
import React, { useState } from 'react';
import { useRouter } from 'next/navigation'
import Button from '../components/Button'
import styles from './Registration.module.css'

interface User {
  name: string;
  phone: string;
  email: string;
  password: string;
  homeAddress: string;
  cardNumber: string;
  expirationDate: string;
  billingAddress: string;
}

async function registerUser(accountInfo:User) {
    try {
      console.log(accountInfo)
      const response = await fetch(`http://localhost:8080/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
          //'Authorization': `Bearer t3klslescdsewe`,
        },
        body: JSON.stringify(accountInfo),
      })
      console.log("after")

      if (!response.ok) {
        console.log(response);
        throw new Error('Network response was not ok');
      } else {
        console.log(response);
        console.log("response is ok");
      }

    } catch (error) {
      console.error("Error registering in:", error);
    }
}

export default function Registration() {
  const router = useRouter()

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [homeAddress, setHomeAddress] = useState('');
  const [cardNumber, setCardNum] = useState('');
  const [expirationDate, setExpDate] = useState('');
  const [billingAddress, setBillAddress] = useState('');

  
  const handleClick = () => {
    registerUser({name, phone, email, password, homeAddress, cardNumber, expirationDate, billingAddress})
    router.push('/registration-confirmation')
  }
  return (
    <div className={styles.main_body}>
      <div className={styles.info_box}>
        <h1 className={styles.big_headers}> Sign Up </h1>
          <section className={styles.inputs}>
            <form onSubmit={handleClick}>
              <div>
                <h2 className={styles.headers}>Name*</h2>
                <input value={name} onChange={(e) => setName(e.target.value)} className={styles.text_fields} required />
                <h2 className={styles.headers}>Phone Number</h2>
                <input value={phone} onChange={(e) => setPhone(e.target.value)} className={styles.text_fields} />
                <h2 className={styles.headers}>Email*</h2>
                <input value={email} onChange={(e) => setEmail(e.target.value)} className={styles.text_fields} required />
                <h2 className={styles.headers}>Set Password*</h2>
                <input value={password} onChange={(e) => setPassword(e.target.value)} className={styles.text_fields} required />
                <h2 className={styles.headers}>Home Address</h2>
                <input value={homeAddress} onChange={(e) => setHomeAddress(e.target.value)} className={styles.text_fields} />
                <input value={homeAddress} onChange={(e) => setHomeAddress(e.target.value)} className={styles.text_fields} />
                <input value={homeAddress} onChange={(e) => setHomeAddress(e.target.value)} className={styles.text_fields} />
              </div>
              <div>
                <h2 className={styles.big_headers}> Payment Information</h2>
                <h2 className={styles.headers}>Card Number</h2>
                <input value={cardNumber} onChange={(e) => setCardNum(e.target.value)} className={styles.text_fields} />
                <h2 className={styles.headers}>Expiration Date</h2>
                <input value={expirationDate} onChange={(e) => setExpDate(e.target.value)} className={styles.text_fields} />
                <h2 className={styles.headers}>Billing Address</h2>
                <input value={billingAddress} onChange={(e) => setBillAddress(e.target.value)} className={styles.text_fields} />
                <input value={billingAddress} onChange={(e) => setBillAddress(e.target.value)} className={styles.text_fields} />
                <input value={billingAddress} onChange={(e) => setBillAddress(e.target.value)} className={styles.text_fields} />
              </div>
            </form>
            <Button type='submit'>Create Account</Button>
          </section>
      </div>
    </div>
  );
};





 