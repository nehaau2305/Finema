'use client'
import React from 'react';
import { useRouter } from 'next/navigation'
import Button from '../components/Button'
import styles from './Login.module.css'
import Image from 'next/image'
import finemalogo from './finemalogo.png'

export default function Login() {
  const router = useRouter()
  
  const handleSignUp = () => {
    router.push('/registration')
  }
  const handleLogIn = () => {
    router.push('/loggedin-user-home')
  }

  const handleAdminLogIn = () => {
    router.push('/admin-home')
  }
  return (
    <div className={styles.main_body}>
     <div className={styles.login_box}>
        <div>
          <Image
            src={finemalogo}
            width={200}
            height={200}
            alt="finema logo"
            />
        </div>
          <section>
            <h2 className={styles.headers}>email</h2>
              <input type="text" className={styles.text_fields} />
          </section>

          <section>
            <h2 className={styles.headers}>password</h2>
              <input type="text" className={styles.text_fields} />
          </section>

      <Button onClick={handleLogIn}>log in</Button>
      <h1 className={styles.headers}> dont have an account yet? sign up! </h1>
      <Button onClick={handleSignUp}>sign up</Button>
      <Button onClick={handleAdminLogIn}>admin log in</Button>


      </div>
    </div>
  );
};

