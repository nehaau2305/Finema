'use client'
import React, { useState, useEffect } from 'react';
import styles from './MovieCard.module.css';
import MovieInfoPopup from './MovieInfoPopup';
import Button from './Button';
import { useRouter } from 'next/navigation';

interface Review {
  id: number,
  reviewText: string
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

  const router = useRouter();

  function goToBooking() {
    router.push('/show-time');
  }

  return (
    <div className={styles.main_body}>
      <div onClick={() => setIsOpened(true)}>
        <h1 className={styles.headers}> {name} </h1>
        <h1 className={styles.headers}> {mpaaRating} </h1>
        <section>
          <img className={styles.movie_banner} src={source} alt={name} />
        </section>
      </div>
      <Button onClick={goToBooking}> Book Ticket </Button> {/** We need a way to send the necessary information to the booking page through the info popup or book ticket button */}
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
