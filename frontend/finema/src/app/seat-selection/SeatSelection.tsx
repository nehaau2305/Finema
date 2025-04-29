'use client'
import React, { useState, useEffect } from 'react'
import styles from './SeatSelection.module.css'
import Button from '../components/Button'
import { useRouter, useSearchParams } from 'next/navigation'
import SeatCard from '../components/SeatCard'
import Link from 'next/link'

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
  id:number;
  showtimeID:number;
  seatNum:number;
  reserved:boolean;
}

interface Ticket {
  seatID:number;
  seat:Seat;
  ticketAge:string;
}


export default function ShowTime() {
  const router = useRouter();
  const searchParams = useSearchParams()

  const movieId = searchParams.get('movieId') || "";

  const [name, setName] = useState<string|null>("");
  const [adult, setAdult] = useState<number>(0);
  const [child, setChild] = useState<number>(0);
  const [senior, setSenior] = useState<number>(0);
  const [tickets, setTickets] = useState<Ticket[]>([]);

  const initialAdultCount = parseInt(searchParams.get('adult') || '0');
  const initialChildCount = parseInt(searchParams.get('child') || '0');
  const initialSeniorCount = parseInt(searchParams.get('senior') || '0');

  const initialTotalSeats = React.useMemo(() => {
    return initialAdultCount + initialChildCount + initialSeniorCount;
  }, [initialAdultCount, initialChildCount, initialSeniorCount]);


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

  const createAndAddTicket = (seat:Seat, ticketAge:string) => {
    // This could optionally also send the tickets to the database one at a time, so the seats get reserved
    const newTicket = {
      seatID: seat.id,
      seat: seat,
      ticketAge: ticketAge
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
            totalSeats: initialTotalSeats.toString(), // Total number of tickets selected
            date: date,
            time: time,
            showtimeId: showtimeId,
            showroomId: showroomId,
            adult: initialAdultCount.toString(), // Remaining adult tickets
            child: initialChildCount.toString(), // Remaining child tickets
            senior: initialSeniorCount.toString(), // Remaining senior tickets
            movieId: movieId
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
        createAndAddTicket(seat, "ADULT")
        if (adult - 1 == 0) {
          setCurSeatType(1);
          if ((senior == 0) && (child == 0)) {
            endAndSend();
          }
        }
      } else if (curSeatType == 1) {
        setChild(child - 1)
        createAndAddTicket(seat, "CHILD")
        if (child - 1 == 0) {
          setCurSeatType(2);
          if (senior == 0) {
            endAndSend();
          }
        }
      } else {
        setSenior(senior - 1)
        createAndAddTicket(seat, "SENIOR")
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
      <section className={styles.btn2}>
        <Link href={{
            pathname: '/show-time',
            query: {
            name: name,
            movieId: movieId
          },
          }}> Go Back
        </Link>
      </section>
    </div>
  );
};