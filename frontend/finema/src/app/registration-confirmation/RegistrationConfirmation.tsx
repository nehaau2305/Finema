'use client'
import React from 'react';
import { useRouter } from 'next/navigation'
import Button from '../components/Button'
import styles from './RegistrationConfirmation.module.css'

export default function RegistrationConfirmation() {
  const router = useRouter()
  
  const handleClick = () => {
    router.push('/login')
  }
  return (
    <div className={styles.main_body}>
        <h1 className={styles.headers}> Registration confirmed. Your account has been made!</h1>
        <Button onClick={handleClick}>Log In</Button>
    </div>
  );
};