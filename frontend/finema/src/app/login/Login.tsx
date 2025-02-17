'use client'
import React from 'react';
import { useRouter } from 'next/navigation'
import Button from '../components/Button'
import styles from './Login.module.css'

export default function Login() {
  const router = useRouter()
  
  const handleSignUp = () => {
    router.push('/registration')
  }
  const handleLogIn = () => {
    router.push('/loggedin-user-home')
  }
  return (
    <div className={styles.main_body}>
     <div className={styles.login_box}>
        <h1>FINEMA</h1>
          <section>
            <h2 className={styles.headers}>email</h2>
              <input type="text" className={styles.text_fields} />
          </section>

          <section>
            <h2 className={styles.headers}>password</h2>
              <input type="text" className={styles.text_fields} />
          </section>

      <Button onClick={handleLogIn}>Log In</Button>
      <h1> Dont have an account yet? Sign up! </h1>
      <Button onClick={handleSignUp}>Sign Up</Button>


      </div>
    </div>
  );
};

