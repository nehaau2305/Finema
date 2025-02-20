'use client'
import React, { useState } from 'react'
import styles from './SeatSelection.module.css'
import Button from '../components/Button'
import { useRouter } from 'next/navigation'


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

  return (
    <div className={styles.main_body}>
      <h1 className={styles.title}> Select Seat </h1>
      <section className={styles.seat_box}>
        <h1> Screen </h1>
        <section className={styles.seat_selector}>
          <button onClick={selectSeat} className={clicked ? styles.selected : styles.notSelected} >1</button>
          <button onClick={selectSeat} className={clicked ? styles.selected : styles.notSelected} >2</button>
          <button onClick={selectSeat} className={clicked ? styles.selected : styles.notSelected} >3</button>
          <button onClick={selectSeat} className={clicked ? styles.selected : styles.notSelected} >4</button>
          <button onClick={selectSeat} className={clicked ? styles.selected : styles.notSelected} >5</button>
          <button onClick={selectSeat} className={clicked ? styles.selected : styles.notSelected} >6</button>
          <button onClick={selectSeat} className={clicked ? styles.selected : styles.notSelected} >7</button>
          <button onClick={selectSeat} className={clicked ? styles.selected : styles.notSelected} >8</button>
          <button onClick={selectSeat} className={clicked ? styles.selected : styles.notSelected} >9</button>
          <button onClick={selectSeat} className={clicked ? styles.selected : styles.notSelected} >10</button>
          <button onClick={selectSeat} className={clicked ? styles.selected : styles.notSelected} >11</button>
          <button onClick={selectSeat} className={clicked ? styles.selected : styles.notSelected} >12</button>
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