'use client'
import React, { useState } from 'react'
import styles from './SeatSelection.module.css'
import Button from '../components/Button'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import fish from './fish.png'


export default function ShowTime() {
  const router = useRouter();
  const [clicked, setClicked] = useState(false)

  function goToCheckout() {
    router.push('/order-summary')
  }
  function goBack() {
    router.push('/show-time')
  }

  function selectSeat() {
    setClicked(!clicked)
  }

  const seatNum = '1';

  return (
    <div className={styles.main_body}>
      <h1 className={styles.title}> Select Seat </h1>
      <div>
        <h2 className={styles.seat_num}> Seat Number: {seatNum} </h2>
        <section className={styles.seat_box}>
          <h1> Screen </h1>
          <section className={styles.seat_selector}>
          <button>
                <Image
                src={fish}
                height={200}
                width={200}
                alt="fish"
                /> 
            </button>
            <button>
                <Image
                src={fish}
                height={200}
                width={200}
                alt="fish"
                /> 
            </button>
            <button>
                <Image
                src={fish}
                height={200}
                width={200}
                alt="fish"
                /> 
            </button>
            <button>
                <Image
                src={fish}
                height={200}
                width={200}
                alt="fish"
                /> 
            </button>
            <button>
                <Image
                src={fish}
                height={200}
                width={200}
                alt="fish"
                /> 
            </button>
            <button>
                <Image
                src={fish}
                height={200}
                width={200}
                alt="fish"
                /> 
            </button>
            <button>
                <Image
                src={fish}
                height={200}
                width={200}
                alt="fish"
                /> 
            </button>
            <button>
                <Image
                src={fish}
                height={200}
                width={200}
                alt="fish"
                /> 
            </button>
            <button>
                <Image
                src={fish}
                height={200}
                width={200}
                alt="fish"
                /> 
            </button>
            <button>
                <Image
                src={fish}
                height={200}
                width={200}
                alt="fish"
                /> 
            </button>
            <button>
                <Image
                src={fish}
                height={200}
                width={200}
                alt="fish"
                /> 
            </button>
            <button>
                <Image
                src={fish}
                height={200}
                width={200}
                alt="fish"
                /> 
            </button>

          </section>
        </section>
      </div>
      <div className={styles.btn1}>
        <Button onClick={goToCheckout}> Next </Button>
      </div>
      <div className={styles.btn2}>
        <Button onClick={goBack}> Go Back </Button>
      </div>
    </div>
  );
};