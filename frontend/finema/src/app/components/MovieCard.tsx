'use client'
import React, { useState, useEffect } from 'react';
import styles from './MovieCard.module.css';
import MovieInfoPopup from './MovieInfoPopup';
import { useRouter } from 'next/navigation';
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

interface Review {
  id: number,
  reviewText: string
}

interface ShowTime {
  id: number;
  movieId: number;
  date: string; // Format: YYYY-MM-DD
  time: string; // Format: HH:MM
}

interface MovieCardProps {
  name: string;
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

export default function MovieCard({ name, source, movieId, synopsis, director, producer, mpaaRating, cast, date, showtimes=[], showShowtimes = false}: MovieCardProps) {
  const [isOpened, setIsOpened] = useState(false);
  const [reviews, setReviews] = useState<Review[]>([])
  const [showTimes, setShowTimes] = useState<ShowTime[]>([]);

  useEffect(() => {
    fetch('http://localhost:8080/review/movie/' + movieId, {
      method: 'GET',
      headers: {
//            'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
      }
      })
      .then(response => response.json())
      .then(data => setReviews(data))
      .catch(error => console.error('Error fetching reviews:', error));
  }, [])

  const getTodayDate = () => {
    const today = new Date();
    return today.toLocaleString('fr-CA', { timeZone: 'America/New_York' }).split(' ')[0]; // Get current date in "YYYY-MM-DD" format
  };

  useEffect(() => {
    // Fetch showtimes for the movie
    const fetchShowTimes = async () => {
      try {
          const currentDate = new Date().toISOString().split('T')[0]; // Get current date in "YYYY-MM-DD" format
          const response = await fetch(`http://localhost:8080/showtimes/get-upcoming-by-movie/${movieId}?date=${currentDate}`);
          if (!response.ok) {
              throw new Error('Failed to fetch showtimes');
          }
          const data: ShowTime[] = await response.json();
          setShowTimes(data);
      } catch (error) {
          console.error('Error fetching showtimes:', error);
      }
    };
    fetchShowTimes();
  }, [movieId])

  const filteredShowtimes:ShowTime[] = [];
  const movieShowtimes = showtimes.filter((showTime) => showTime.movieId === movieId);
  let existsFlag = false;
  for (let i = 0; i < movieShowtimes.length; i++) {
    existsFlag = false;
    for (let j = 0; j < filteredShowtimes.length; j++) {
      if (filteredShowtimes[j].time == movieShowtimes[i].time) {
        existsFlag = true;
        break;
      }
    }
    if (!existsFlag) {
      filteredShowtimes.push(movieShowtimes[i]);
    }
  }


  const showtimeSection = (
    <section className={styles.show_times}>
      <h2>Show Times for {date || getTodayDate()}:</h2>
      {filteredShowtimes.length > 0 ? filteredShowtimes
        .map((showTime) => (
          <p key={showTime.id}>{timeLabels[showTime.time as ConsecutiveTimes]}</p> // Display only the time
        )) : (
          <p> No Showtimes Found </p>
        )}
    </section>
  )

  return (
    <div className={styles.main_body}>
      <section className={styles.left}>
        <div onClick={() => setIsOpened(true)}>
          <h1 className={styles.headers}> {name} </h1>
          <h1 className={styles.headers}> {mpaaRating} </h1>
          <section>
            <img className={styles.movie_banner} src={source} alt={name} />
          </section>
        </div>
        <Link href={{
            pathname: '/show-time',
            query: {
              name: name,
              movieId: movieId,
              date: showTimes[0]?.date,
          },
          }}> Book Tickets 
        </Link>
      </section>
      {showShowtimes ? showtimeSection : (<div></div>)}
      
      <MovieInfoPopup
        isOpened={isOpened}
        onClose={() => setIsOpened(false)}
        name={name}
        imageSrc={source}
        movieId={movieId}
        mpaaRating={mpaaRating}
        synopsis={synopsis}
        director={director}
        producer={producer}
        cast={cast}
        reviews={reviews}
      />

    </div>
  );
}
