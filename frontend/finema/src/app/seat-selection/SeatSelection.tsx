'use client'
import React, { useState, useEffect } from 'react'
import styles from './SeatSelection.module.css'
import Button from '../components/Button'
import { useRouter, useSearchParams } from 'next/navigation'
import SeatCard from '../components/SeatCard'

type ConsecutiveTimes =
  | 'TWELVE_AM'
  | 'THREE_AM'
  | 'SIX_AM'
  | 'NINE_AM'
  | 'TWELVE_PM'
  | 'THREE_PM'
  | 'SIX_PM'
  | 'NINE_PM';

const timeLabels: { [key in ConsecutiveTimes]: string } = {
    TWELVE_AM: '12:00 AM',
    THREE_AM: '3:00 AM',
    SIX_AM: '6:00 AM',
    NINE_AM: '9:00 AM',
    TWELVE_PM: '12:00 PM',
    THREE_PM: '3:00 PM',
    SIX_PM: '6:00 PM',
    NINE_PM: '9:00 PM'
};


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

  const showtimeId = searchParams.get('showtimeId') || 'Unknown showtimeId';
  const showroomId = searchParams.get('showroomId') || 'Unknown showtimeId';
  const [date, setDate] = useState<string>("");
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    setName(searchParams.get('name'))
    var temp = searchParams.get('adult')
    temp != null ? setAdult(parseInt(temp)) : setAdult(0)
    temp = searchParams.get('child')
    temp != null ? setChild(parseInt(temp)) : setChild(0)
    temp = searchParams.get('senior')
    temp != null ? setSenior(parseInt(temp)) : setSenior(0)

    temp = searchParams.get('date')
    temp != null ? setDate(temp) : setDate("")
    temp = searchParams.get('time')
    temp != null ? setTime(temp) : setTime("")
  }, [searchParams])

  const [totalSeats, setTotalSeats] = useState<number>(-1);

  useEffect(() => {
    setTotalSeats(adult+child+senior)
  }, [adult, child, senior])

  const [curSeatType, setCurSeatType] = useState<number>(0); // 0 adult, 1 child, 2 senior

  useEffect(() => {
    if (adult == 0) {
      if (child == 0) {
        setCurSeatType(2);
      } else {
        setCurSeatType(1);
      }
    } else {
      setCurSeatType(0);
    }
  }, [adult, child, senior])


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
    console.log(showtimeId)
    fetch('http://localhost:8080/showtimes/showtime-seats/' + showtimeId, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch seats');
        }
        return response.json();
      })
      .then((data) => {
        setSeats(data);
      })
      .catch((error) => {
        console.error('Error fetching seats:', error);
      });
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
    setTimeout(() => {
          const query = new URLSearchParams({
            name: name || '',
            tickets: JSON.stringify(tickets),
            totalSeats: totalSeats.toString(),
            date: date,
            time: time,
            showtimeId: showtimeId,
            showroomId: showroomId  
          }).toString();
          router.push(`/order-summary?${query}`);
        }, 100);
  };

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
      <h1 className={styles.title}> Select Seat for: {name} </h1>
      <div>
        <h2 className={styles.seat_num}> Current Seat Type: {seatType}, Seats Remaining: {totalSeats} </h2>
        <section className={styles.seat_box}>
          <h1> Screen </h1>
          <section className={styles.seat_selector}>
            <ul className={styles.ul_fourty_five}>
              {firstFourtyFive.length > 0 ? (
                firstFourtyFive.map((seat: Seat, index: number) => (
                  <li key={seat.id}>
                    <SeatCard seatNum={seat.seatNum} reserved={seat.reserved} onClick={() => handleSeatChange(seat)}/>
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
                    <SeatCard seatNum={seat.seatNum} reserved={seat.reserved} onClick={() => handleSeatChange(seat)}/>
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
                    <SeatCard seatNum={seat.seatNum} reserved={seat.reserved} onClick={() => handleSeatChange(seat)}/>
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