'use client'
import React, { useEffect, useState } from 'react';
import styles from './ShowTime.module.css';
import Button from '../components/Button';
import ShowCard from '../components/ShowCard';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

interface ShowTime {
  id: number;
  movieID: number;
  date: string;
  time: string;
  showroomID: number;
}

export default function ShowTime() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const name = searchParams.get('name');
  const theaterId = searchParams.get('theaterId'); // Assuming theaterId is passed as a query parameter
  const date = searchParams.get('date'); // Assuming date is passed as a query parameter

  const [adult, setAdult] = useState('0');
  const [child, setChild] = useState('0');
  const [senior, setSenior] = useState('0');
  const [selectedTime, setSelectedTime] = useState<ShowTime>();
  const [showTimes, setShowTimes] = useState<ShowTime[]>([]);
  const [currID, setCurrID] = useState(0);

  // Fetch showtimes from the backend
  useEffect(() => {
    const retrieveShowtimes = async () => {
      try {
        const response = await fetch('http://localhost:8080/showtimes/get-by-theater-and-date', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            theaterId: parseInt(theaterId || '0'), // Convert theaterId to a number
            date: date || '', // Use the date from query parameters
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to fetch showtimes');
        }

        const data: ShowTime[] = await response.json();
        setShowTimes(data);
      } catch (error) {
        console.error('Error fetching showtimes:', error);
      }
    };

    if (theaterId && date) {
      retrieveShowtimes();
    }
  }, [theaterId, date]);

  function goToSeats() {
    router.push('/seat-selection');
  }

  function goBack() {
    router.push('/web-user-home');
  }

  const handleShowTime = (time: ShowTime) => {
    console.log('Selected Showtime:', time);
    setCurrID(time.id);
    setSelectedTime(time);
  };

  return (
    <div className={styles.main_body}>
      <h1 className={styles.title}> {name} </h1>
      <section className={styles.selectors}>
        <section>
          <section className={styles.box}>
            <h1 className={styles.headers}> Showtimes </h1>
            <ul>
              {showTimes.length > 0 ? (
                showTimes.map((time: ShowTime) => (
                  <li key={time.id}>
                    <ShowCard
                      date={time.date}
                      time={time.time}
                      checked={currID === time.id}
                      onClick={() => handleShowTime(time)}
                    />
                  </li>
                ))
              ) : (
                <p>No results found</p>
              )}
            </ul>
          </section>
        </section>
        <section>
          <section className={styles.box}>
            <h1 className={styles.headers}> Ticket Type </h1>
            <section className={styles.list}>
              <div>
                <h2> Adult: </h2>
                <input
                  name="adult"
                  value={adult}
                  onChange={(e) => setAdult(e.target.value)}
                  type="text"
                />
              </div>
              <div>
                <h2> Child: </h2>
                <input
                  name="child"
                  value={child}
                  onChange={(e) => setChild(e.target.value)}
                  type="text"
                />
              </div>
              <div>
                <h2> Senior: </h2>
                <input
                  name="senior"
                  value={senior}
                  onChange={(e) => setSenior(e.target.value)}
                  type="text"
                />
              </div>
            </section>
          </section>
        </section>
      </section>
      <div className={styles.btn1}>
        <Link
          href={{
            pathname: '/seat-selection',
            query: {
              name: name,
              adult: adult,
              child: child,
              senior: senior,
            },
          }}
        >
          Book Tickets
        </Link>
      </div>
      <div className={styles.btn2}>
        <Button onClick={goBack}> Go Back </Button>
      </div>
    </div>
  );
}