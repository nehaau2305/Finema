'use client'
import React, { useState, useEffect } from 'react'
import styles from './SeatSelection.module.css'
import Button from '../components/Button'
import { useRouter } from 'next/navigation'
import SeatCard from '../components/SeatCard'

interface Seat {
  id:number,
  showroomID:number,
  seatNum:number,
  reserved:boolean
}


export default function ShowTime() {
  const router = useRouter();

  var defaultSeats = []
  for (let i = 0; i < 56; i++) {
    const aSeat = {
      id: i,
      showroomID: 0,
      seatNum: i,
      reserved: false
    }
    defaultSeats.push(aSeat)
  } 
  const [seats, setSeats] = useState<Seat[]>(defaultSeats)
  const [firstFourtyFive, setFirstFourtyFive] = useState<Seat[]>([])
  const [secondSeven, setSecondSeven] = useState<Seat[]>([])
  const [lastFour, setlastFour] = useState<Seat[]>([])

  useEffect(() => {
    setFirstFourtyFive(seats.splice(0, 45))
    setSecondSeven(seats.splice(0, 7))
    setlastFour(seats.splice(0, 4))
  }, seats)


  function goToCheckout() {
    router.push('/order-summary')
  }
  function goBack() {
    router.push('/show-time')
  }

  function handleSeatChange(seat:Seat) {
    console.log("HEY")
    seat.reserved = true;
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
            <ul className={styles.ul_fourty_five}>
              {firstFourtyFive.length > 0 ? (
                firstFourtyFive.map((seat: Seat) => (
                  <li key={seat.id}>
                    <SeatCard seatNum={seat.seatNum} reserved={seat.reserved === true} onClick={() => handleSeatChange(seat)}/>
                  </li>
                ))
              ) : (
                <p>Error</p>
              )}
            </ul>
            <ul className={styles.ul_seven}>
              {secondSeven.length > 0 ? (
                secondSeven.map((seat: Seat) => (
                  <li key={seat.id}>
                    <SeatCard seatNum={seat.seatNum} reserved={seat.reserved === true} onClick={() => handleSeatChange(seat)}/>
                  </li>
                ))
              ) : (
                <p>Error</p>
              )}
            </ul>
            <ul className={styles.ul_four}>
              {lastFour.length > 0 ? (
                lastFour.map((seat: Seat) => (
                  <li key={seat.id}>
                    <SeatCard seatNum={seat.seatNum} reserved={seat.reserved === true} onClick={() => handleSeatChange(seat)}/>
                  </li>
                ))
              ) : (
                <p>Error</p>
              )}
            </ul>
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