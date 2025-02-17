'use client'
import React from 'react';
import { useRouter } from 'next/navigation'
import Button from '../components/Button'
import styles from './Registration.module.css'

export default function Registration() {
  const router = useRouter()
  
  const handleClick = () => {
    router.push('/registration-confirmation')
  }
  return (
    <div className={styles.main_body}>
      <div className={styles.info_box}>
        <h1 className={styles.big_headers}> Sign Up </h1>
          <section className={styles.inputs}>
            <div>
              <h2 className={styles.headers}>Name*</h2>
              <input type="text" className={styles.text_fields} />
              <h2 className={styles.headers}>Phone Number*</h2>
              <input type="text" className={styles.text_fields} />
              <h2 className={styles.headers}>Email</h2>
              <input type="text" className={styles.text_fields} />
              <h2 className={styles.headers}>Password</h2>
              <input type="text" className={styles.text_fields} />
              <h2 className={styles.headers}>Home Address</h2>
              <input type="text" className={styles.text_fields} />
              <input type="text" className={styles.text_fields} />
              <input type="text" className={styles.text_fields} />
            </div>
            <div>
              <h2 className={styles.big_headers}> Payment Information</h2>
              <h2 className={styles.headers}>Card Number</h2>
              <input type="text" className={styles.text_fields} />
              <h2 className={styles.headers}>Expiration Date</h2>
              <input type="text" className={styles.text_fields} />
              <h2 className={styles.headers}>Billing Address</h2>
              <input type="text" className={styles.text_fields} />
              <input type="text" className={styles.text_fields} />
              <input type="text" className={styles.text_fields} />
            </div>
          </section>

        <Button onClick={handleClick}>Create Account</Button>
      </div>
    </div>
  );
};





 