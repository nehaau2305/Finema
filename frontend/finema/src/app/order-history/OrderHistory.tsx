'use client'
import React, {useEffect, useState} from 'react';
import styles from './OrderHistory.module.css'
import { useRouter } from 'next/navigation'
import { useToken } from '../components/useToken'
import TopBar from '../components/TopBar'


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

interface Movie {
  title: string;
  source: string;
  movieId: number;
  mpaaRating: string; 
  synopsis: string;
  director: string;
  producer: string;
  cast: string;
  date?: string;
  showtimes?:ShowTime[];
  showShowtimes?:boolean;
}

interface ShowTime {
  movie: Movie;
  date: string;
  time: string;
}

interface Seat {
  showTime: ShowTime;
  seatNum: number;
}

interface Ticket {
  seat: Seat;
  ticketAge: string;
}

interface Order {
  id: number;
  showtime: ShowTime;
  totalPrice: number;
  tickets: Ticket[];
}

export default function OrderHistory() {
  const router = useRouter()
  const [token, setToken] = useToken('token');
  const [orderHistory, setOrderHistory] = useState<Order[]>([])
  useEffect(()=> {
    if (token == '') {
      router.push('/web-user-home')
    }
    fetch('http://localhost:8080/order/all',{
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    }) // Call for all orders associated with a user
    .then(response => response.json())
    .then(data => {
      setOrderHistory(data)})
    .catch(error => console.error('An error occured retrieving order history: ' + error))
  }, [token])

  useEffect(()=> {
    orderHistory.map((entry:Order) => {
      console.log(entry)
    })
  }, [orderHistory])

  // // Fake Data
  // const showtimeEx1 = {
  //   movie: "Batman",
  //   date: "4/30/02",
  //   time: '3AM'
  // }
  // const showtimeEx2 = {
  //   movie: "Superman",
  //   date: "5/6/25",
  //   time: '7PM'
  // }

  // const seat11 = {
  //   showTime: showtimeEx1,
  //   seatNum: 3,
  // }
  // const seat12 = {
  //   showTime: showtimeEx1,
  //   seatNum: 4,
  // }
  // const seat13 = {
  //   showTime: showtimeEx1,
  //   seatNum: 5,
  // }
  // const seat14 = {
  //   showTime: showtimeEx1,
  //   seatNum: 6,
  // }
  // const seat21 = {
  //   showTime: showtimeEx2,
  //   seatNum: 4,
  // }
  // const seat22 = {
  //   showTime: showtimeEx2,
  //   seatNum: 5,
  // }

  // const ticket11 = {
  //   seat: seat11,
  //   ticketType: 'adult',
  // }
  // const ticket12 = {
  //   seat: seat12,
  //   ticketType: 'adult',
  // }
  // const ticket13 = {
  //   seat: seat13,
  //   ticketType: 'child',
  // }
  // const ticket14 = {
  //   seat: seat14,
  //   ticketType: 'senior',
  // }
  // const ticket21 = {
  //   seat: seat21,
  //   ticketType: 'adult',
  // }
  // const ticket22 = {
  //   seat: seat22,
  //   ticketType: 'adult',
  // }

  // const order1 = {
  //   id: 1,
  //   showTime: showtimeEx1,
  //   totalPrice: 123.01,
  //   tickets: [ticket11, ticket12, ticket13, ticket14]
  // }
  // const order2 = {
  //   id: 2,
  //   showTime: showtimeEx2,
  //   totalPrice: 13.83,
  //   tickets: [ticket21, ticket22]
  // }

  
  return (
    <div>
        <TopBar loggedIn={true} showOrderHistory={false}/>
        <section className={styles.main_body}>
          <h1> Your Order History </h1>
            <ul className={styles.order_section}>
              {orderHistory.length > 0 ? (
                orderHistory.map((entry: Order) => (
                  <li className={styles.order} key={entry.id}>
                    <div>
                      <p> Date: </p>
                      <p> {entry.showtime.date} </p>
                    </div>
                    <div>
                      <p> Time: </p>
                      <p> {timeLabels[entry.showtime.time as ConsecutiveTimes]} </p>
                    </div>
                    <div>
                      <p> Movie: </p>
                      <p> {entry.showtime.movie.title} </p>
                    </div>
                    <p> Seats: </p>
                    <ul className={styles.seat_section}> 
                      {entry.tickets.length > 0 ? (
                        entry.tickets.map((ticket: Ticket) => (
                          <li className={styles.seat} key={ticket.seat.seatNum}>
                            <p> Seat Number: {ticket.seat.seatNum} </p>
                            <p> Type: {ticket.ticketAge} </p>
                          </li>
                        ))
                      ) : (
                        <p>No history found</p>
                      )}
                    </ul>
                    <div>
                      <p> Price: </p>
                      <p> {'$' + entry.totalPrice.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')} </p>
                    </div>
                  </li>
                ))
              ) : (
                <p>No history found</p>
              )}
            </ul>
        </section>
    </div>
  );
};

