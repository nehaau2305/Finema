'use client'
import React, { useState, useEffect } from 'react'
import styles from './SeatSelection.module.css'
import Button from '../components/Button'
import { useRouter, useSearchParams } from 'next/navigation'
import SeatCard from '../components/SeatCard'


interface Seat {
  id:number,
  showroomID:number,
  seatNum:number,
  reserved:boolean
}

interface Ticket {
  seatID:number,
  seatNum:number,
  type:string
}


export default function ShowTime() {
  const router = useRouter();
  const searchParams = useSearchParams()

  const [name, setName] = useState<string|null>("");
  const [adult, setAdult] = useState<number>(0);
  const [child, setChild] = useState<number>(0);
  const [senior, setSenior] = useState<number>(0);
  const [tickets, setTickets] = useState<Ticket[]>([]);

  useEffect(() => {
    setName(searchParams.get('name'))
    var temp = searchParams.get('adult')
    temp != null ? setAdult(parseInt(temp)) : setAdult(0)
    temp = searchParams.get('child')
    temp != null ? setChild(parseInt(temp)) : setChild(0)
    temp = searchParams.get('senior')
    temp != null ? setSenior(parseInt(temp)) : setSenior(0)
  }, [searchParams])

  const [totalSeats, setTotalSeats] = useState<number>(-1);

  useEffect(() => {
    setTotalSeats(adult+child+senior)
  }, [adult, child, senior])

  const [curSeatType, setCurSeatType] = useState<number>(0); // 0 adult, 1 child, 2 senior


  var defaultSeats:Seat[] = []
  for (let i = 0; i < 56; i++) {
    const aSeat = {
      id: i,
      showroomID: 0,
      seatNum: i,
      reserved: false
    }
    defaultSeats.push(aSeat)
  } 
  const [seats, setSeats] = useState<Seat[]>([])
  const [firstFourtyFive, setFirstFourtyFive] = useState<Seat[]>([])
  const [secondSeven, setSecondSeven] = useState<Seat[]>([])
  const [lastFour, setlastFour] = useState<Seat[]>([])

  useEffect(() => {
    setSeats(defaultSeats)
  }, [])

  useEffect(() => {
    setFirstFourtyFive(seats.splice(0, 45));
    setSecondSeven(seats.splice(0, 7));
    setlastFour(seats.splice(0, 4));
  }, [seats])


  function goToCheckout() {
    router.push('/order-summary')
  }
  function goBack() {
    router.push('/show-time')
  }

  const createAndAddTicket = (seat:Seat, type:string) => {
    // This could optionally also send the tickets to the database one at a time, so the seats get reserved
    const newTicket = {
      seatID: seat.id,
      seatNum: seat.seatNum,
      type: type
    }
    const newTickets = tickets;
    newTickets.push(newTicket)
    setTickets(newTickets)
  }

  const endAndSend = () => {
    console.log(tickets)
    //Then send to database, maybe have some pending order id returned that can be added to the URL
    setTimeout(() => router.push('/order-summary'), 1000)
  }

  function handleSeatChange(seat: Seat) {
    if ((adult == 0) && (child == 0) && (senior == 0)) {
      console.log("Nuh uh uhhh!!")
    } else {
      if (curSeatType == 0) {
        setAdult(adult - 1)
        createAndAddTicket(seat, "adult")
        if (adult - 1 == 0) {
          setCurSeatType(1);
          if ((senior == 0) && (child == 0)) {
            endAndSend();
          }
        }
      } else if (curSeatType == 1) {
        setChild(child - 1)
        createAndAddTicket(seat, "child")
        if (child - 1 == 0) {
          setCurSeatType(2);
          if (senior == 0) {
            endAndSend();
          }
        }
      } else {
        setSenior(senior - 1)
        createAndAddTicket(seat, "senior")
        if (senior - 1 == 0) {
          endAndSend();
        }
      }
    }
  }
  const [seatType, setSeatType] = useState("")
  useEffect(() => {
    if (curSeatType == 0) {
      setSeatType("Adult")
    } else if 
    (curSeatType == 1) {
      setSeatType("Child")
    } else {
      setSeatType("Senior")
    }
  }, [curSeatType])

  return (
    <div className={styles.main_body}>
      <h1 className={styles.title}> Select Seat </h1>
      <div>
        <h2 className={styles.seat_num}> Current Seat Type: {seatType}, Seats Remaining: {totalSeats} </h2>
        <section className={styles.seat_box}>
          <h1> Screen </h1>
          <section className={styles.seat_selector}>
            <ul className={styles.ul_fourty_five}>
              {firstFourtyFive.length > 0 ? (
                firstFourtyFive.map((seat: Seat, index: number) => (
                  <li key={seat.id}>
                    <SeatCard seatNum={seat.seatNum} reserved={false} onClick={() => handleSeatChange(seat)}/>
                  </li>
                ))
              ) : (
                <p>Error</p>
              )}
            </ul>
            <ul className={styles.ul_seven}>
              {secondSeven.length > 0 ? (
                secondSeven.map((seat: Seat, index: number) => (
                  <li key={seat.id}>
                    <SeatCard seatNum={seat.seatNum} reserved={false} onClick={() => handleSeatChange(seat)}/>
                  </li>
                ))
              ) : (
                <p>Error</p>
              )}
            </ul>
            <ul className={styles.ul_four}>
              {lastFour.length > 0 ? (
                lastFour.map((seat: Seat, index: number) => (
                  <li key={seat.id}>
                    <SeatCard seatNum={seat.seatNum} reserved={false} onClick={() => handleSeatChange(seat)}/>
                  </li>
                ))
              ) : (
                <p>Error</p>
              )}
            </ul>
          </section>
        </section>
      </div>
      <div className={styles.btn2}>
        <Button onClick={goBack}> Go Back </Button>
      </div>
    </div>
  );
};