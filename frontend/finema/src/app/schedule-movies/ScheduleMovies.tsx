'use client'
import React, { useState, useEffect } from "react";
import styles from './ScheduleMovies.module.css'
import TopBar from '../components/TopBar';
import Button from '../components/Button';
import { useRouter } from 'next/navigation'
import { useToken } from '../components/useToken'

interface Showtime {
    showtimeID: number;
    movieID: number;
    date: string;
    time: string;
    showroomID: number;

  }

export default function ScheduleMovies() {

    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const router = useRouter();
    const [token, setToken] = useToken('token');
    const [showtimes, setShowtimes] = useState<Showtime[]>([]);

    useEffect(() => {
        const savedDateString = localStorage.getItem("selectedDate");
        if (savedDateString) {
            setSelectedDate(new Date(savedDateString));
            console.log(savedDateString)
        }
        if (token === '') {
            router.push('/web-user-home');
        } else {
        
            fetch('http://localhost:8080/showtimes/get-by-theater-and-date', {
                method: 'GET',
                headers: {
                  'Authorization': `Bearer ${token}`,
                  'Content-Type': 'application/json'
                }
              })
              .then(response => response.json())
              .then(data => {
                setShowtimes(data);
              })
              .catch(error => console.error('Error fetching showtimes:', error));
            }
    }, [router, token]);

    return (
        <div>
        <TopBar loggedIn={true} showEditProfile={false}/>

        <section className={styles.main_body}>
            <h1> Date: {selectedDate ? selectedDate.toDateString() : "No date selected"}</h1>

            <div className={styles.showroom_box}>
            <section>
              <ul>
                {showtimes.length > 0 ? (
                  showtimes.map((showtime) => (
                    <li key={showtime.showtimeID}>
                      <div>
                        <p>Movie ID: {showtime.movieID}</p>
                        <p>Date: {showtime.date}</p>
                        <p>Time: {showtime.time}</p>
                        <p>Showroom ID: {showtime.showroomID}</p>
                      </div>
                    </li>
                  ))
                ) : (
                  <p>No showtimes found</p>
                )}
              </ul>
            </section>
            </div>
        </section>
      </div>
  );
};