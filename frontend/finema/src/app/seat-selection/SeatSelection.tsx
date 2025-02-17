'use client'
import React from 'react';
import styles from './SeatSelection.module.css'
import Button from '../components/Button'
import { useRouter } from 'next/navigation'

export default function ShowTime() {
  const router = useRouter();

  function goToCheckout() {
    router.push('/order-summary')
  }
  function goBack() {
    router.push('/show-time')
  }

  return (
    <div className={styles.main_body}>
      <h1 className={styles.title}> Select Seat </h1>
      <section className={styles.seat_box}>
        <h1> Screen </h1>
        <section className={styles.seat_selector}>
          How in the Fuck
        </section>
      </section>
      <div className={styles.btn1}>
        <Button onClick={goToCheckout}> Next </Button>
      </div>
      <div className={styles.btn2}>
        <Button onClick={goBack}> Go Back </Button>
      </div>
    </div>
  );
};