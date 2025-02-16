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
      <h1 className={styles.headers}>sign up</h1>
          <section>
            <h2 className={styles.headers}>name*</h2>
            <input type="text" className={styles.text_fields} />
            <h2 className={styles.headers}>phone number*</h2>
            <input type="text" className={styles.text_fields} />
            <h2 className={styles.headers}>email</h2>
            <input type="text" className={styles.text_fields} />
            <h2 className={styles.headers}>password</h2>
            <input type="text" className={styles.text_fields} />
            <h2 className={styles.headers}>home address</h2>
            <input type="text" className={styles.text_fields} />
            <input type="text" className={styles.text_fields} />
            <input type="text" className={styles.text_fields} />
            <h2 className={styles.headers}>payment information</h2>
            <h2 className={styles.headers}>card number</h2>
            <input type="text" className={styles.text_fields} />
            <h2 className={styles.headers}>expiration date</h2>
            <input type="text" className={styles.text_fields} />
            <h2 className={styles.headers}>billing address</h2>
            <input type="text" className={styles.text_fields} />
            <input type="text" className={styles.text_fields} />
            <input type="text" className={styles.text_fields} />
          </section>

        <Button onClick={handleClick}>Create Account</Button>
      </div>
    </div>
  );
};





 