'use client'
import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useToken } from '../components/useToken'
import styles from './OrderConfirmation.module.css'
import TopBar from '../components/TopBar';

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

export default function OrderConfirmation() {
  const router = useRouter()
  const [token, setToken] = useToken('token');
  const [userData, setUserData] = useState({
    name: '',
    phone: '',
    email: '',
    homeAddress: '',
    isAdmin: false
  });
  useEffect(() => {
    if (token === '') {
      router.push('/web-user-home');
    } else {

      fetch('http://localhost:8080/users/profile', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })
      .then(response => response.json())
      .then(data => {
        setUserData(data);
      })
      .catch(error => console.error('Error fetching user data:', error));
    }
  }, [router, token]);

  const searchParams = useSearchParams();

  // Retrieve data from query parameters
  const movieTitle = searchParams.get('movieTitle') || 'Unknown Movie';
  const date = searchParams.get('date') || 'Unknown Date';
  const time = searchParams.get('time') || 'Unknown Time';
  const total = searchParams.get('total') || 'Unknown Cost';
  const searchParamTickets = JSON.parse(searchParams.get('tickets') || "[]");
  const [tickets, setTickets] = useState(searchParamTickets)

  const email = 'joshua@konfrst.com'
  return (
    <div>
      <TopBar loggedIn={true} isAdmin={userData.isAdmin}/>
      <section className={styles.main_body}>
        <section className={styles.thanks}>
          <h1> Thank you for your order! </h1>
          <h2> A confirmation email was sent to {userData.email} </h2>
        </section>
        <section className={styles.summary}>
          <h1> Order Summary </h1>
          <ul>
            <li> Movie Name: {movieTitle} </li>
            <li> Showtime: {date + " " + timeLabels[time as ConsecutiveTimes]} </li>
            <li> Total: {'$' + parseFloat(total).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')} </li>
            <li id={styles.list}> Tickets: 
              {tickets.length > 0 ? (
                tickets.map((ticket: Ticket) => (
                  <div key={ticket.seatID}>
                    <p> Seat Number: {ticket.seat.seatNum}, Age Type: {ticket.ticketAge} </p>
                  </div>
                ))
              ) : (
                <p>No Tickets found</p>
              )}
            </li>
          </ul>
        </section>
      </section>
    </div>
  );
};
