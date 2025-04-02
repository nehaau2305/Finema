'use client'
import React, { SetStateAction, useState } from 'react';
import styles from './ShowTime.module.css'
import Button from '../components/Button'
import ShowCard from '../components/ShowCard'
import { useRouter, useSearchParams } from 'next/navigation'

interface ShowTime {
  id: number,
  movieID: number,
  date: string,
  time: string,
  showroomID: number
}

export default function ShowTime() {
  const router = useRouter();
  const searchParams = useSearchParams()
  const name = searchParams.get('name')

  const defaultTime1 = {
    id: 0,
    movieID: 0,
    date: "April 1st",
    time: "5:00pm",
    showroomID: 0
  }
  const defaultTime2 = {
    id: 1,
    movieID: 0,
    date: "April 2st",
    time: "7:00pm",
    showroomID: 0
  }

  const defaultTime3 = {
    id: 2,
    movieID: 0,
    date: "April 3st",
    time: "7:00am",
    showroomID: 0
  }

  const [adult, setAdult] = useState('0');
  const [child, setChild] = useState('0');
  const [senior, setSenior] = useState('0');
  const [selectedTime, setSelectedTime] = useState<ShowTime>();
  const [showTimes, setShowTimes] = useState<ShowTime[]>([defaultTime1, defaultTime2, defaultTime3]);
  const [currID, setCurrID] = useState(0)

  const retrieveShowtimes = () => {
    fetch('http://localhost:8080/', { // Add showtimes path for a movie given movie name or ID(require query change)
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(data => {
      setShowTimes(showTimes);
    })
    .catch(error => console.error('Error fetching user data:', error));
  }

  function goToSeats() {
    router.push('/seat-selection')
  }
  function goBack() {
    router.push('/web-user-home')
  }
  const handleShowTime = (time:ShowTime) => {
    console.log("HEY")
    setCurrID(time.id);
    setSelectedTime(time)
  }

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
                      <ShowCard date={time.date} time={time.time} checked={currID === time.id} onClick={() => handleShowTime(time)} />
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
                <h2> Adult:  </h2>
                <input name="adult" value={adult} onChange={(e) => setAdult(e.target.value)} type="text" />
              </div>
              <div>
                <h2> Child:  </h2>
                <input name="child" value={child} onChange={(e) => setChild(e.target.value)} type="text" />
              </div>
              <div>
                <h2> Senior:  </h2>
                <input name="senior" value={senior} onChange={(e) => setSenior(e.target.value)} type="text" />
              </div>
            </section>
          </section>
        </section>
      </section>
      <div className={styles.btn1}>
        <Button onClick={goToSeats}>Next </Button>
      </div>
      <div className={styles.btn2}>
        <Button onClick={goBack}> Go Back </Button>
      </div>
    </div>
  );
};