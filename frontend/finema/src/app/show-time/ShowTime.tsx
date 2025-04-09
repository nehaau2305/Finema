'use client';
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

export default function ShowTime() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const name = searchParams.get('name');
  const movieId = searchParams.get('movieId'); // Use movieId to fetch showtimes
  const date = searchParams.get('date');

  const [adult, setAdult] = useState<string>("0");
  const [child, setChild] = useState<string>("0");
  const [senior, setSenior] = useState<string>("0");
  const [selectedTime, setSelectedTime] = useState<ShowTime>();
  const [showTimes, setShowTimes] = useState<ShowTime[]>([]);
  const [currID, setCurrID] = useState(0);

  const retrieveShowtimes = () => {
    if (!movieId || !date) {
      console.error('Movie ID or date is missing');
      return;
    }

    const currentDate = new Date();
    fetch(`http://localhost:8080/showtimes/get-upcoming-by-movie/${movieId}?date=${date}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch showtimes');
        }
        return response.json();
      })
      .then((data) => {
        setShowTimes(data);
      })
      .catch((error) => console.error('Error fetching showtimes:', error));
  };

  useEffect(() => {
    retrieveShowtimes();
  }, [movieId, date]);

  const handleShowTime = (time: ShowTime) => {
    console.log('Selected Showtime:', time);
    setCurrID(time.id);
    setSelectedTime(time);
  };

  const handleTicketInput = (setter: React.Dispatch<React.SetStateAction<string>>) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setter(value);
    }
  };

  function goBack() {
    router.push('/web-user-home');
  }

  return (
    <div className={styles.main_body}>
      <h1 className={styles.title}> {name} </h1>
      <section className={styles.selectors}>
        <section className={styles.box}>
          <h1 className={styles.headers}> Showtimes </h1>
          <ul className={styles.showtimes}>
            {showTimes.length > 0 ? (
              showTimes.map((time: ShowTime) => (
                <li key={time.id}>
                  <ShowCard
                    date={time.date}
                    time={timeLabels[time.time as ConsecutiveTimes]}
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
        <section className={styles.box}>
          <h1 className={styles.headers}> Ticket Type </h1>
          <section className={styles.list}>
            <div>
              <h2> Adult: </h2>
              <input
                name="adult"
                value={adult}
                defaultValue={"0"}
                onChange={handleTicketInput(setAdult)}
                type="text"
              />
            </div>
            <div>
              <h2> Child: </h2>
              <input
                name="child"
                value={child}
                defaultValue={"0"}
                onChange={handleTicketInput(setChild)}
                type="text"
              />
            </div>
            <div>
              <h2> Senior: </h2>
              <input
                name="senior"
                value={senior}
                defaultValue={"0"}
                onChange={handleTicketInput(setSenior)}
                type="text"
              />
            </div>
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
              movieId: movieId, // Pass movieId to the next page
              date: date,
              time: selectedTime?.time,
              showtimeId: selectedTime?.id,
              showroomId: selectedTime?.showroomID           },
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