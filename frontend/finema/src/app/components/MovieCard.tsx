'use client'
import React, { useState, useEffect } from 'react';
import styles from './MovieCard.module.css';
import MovieInfoPopup from './MovieInfoPopup';
import { useRouter } from 'next/navigation';
import Link from 'next/link'

interface Review {
  id: number,
  reviewText: string
}

interface ShowTime {
  id: number;
  date: string;
  time: string;
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
}

export default function MovieCard({ name, source, movieId, synopsis, director, producer, mpaaRating, cast}: MovieCardProps) {
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
          console.log('Showtimes fetched:', data);
      } catch (error) {
          console.error('Error fetching showtimes:', error);
      }
    };
    fetchShowTimes();
  }, [movieId])

  const router = useRouter();

  return (
    <div className={styles.main_body}>
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
