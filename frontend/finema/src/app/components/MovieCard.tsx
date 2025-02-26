'use client'
import React, { useState } from 'react';
import styles from './MovieCard.module.css';
import MovieInfoPopup from './MovieInfoPopup';
import Button from './Button';
import { useRouter } from 'next/navigation';

interface MovieCardProps {
  name: string;
  source: string;
  movieId: number; 
}

export default function MovieCard({ name, source, movieId }: MovieCardProps) {
  const [isOpened, setIsOpened] = useState(false);

  const router = useRouter();

  function goToBooking() {
    router.push('/show-time');
  }

  return (
    <div className={styles.main_body}>
      <div onClick={() => setIsOpened(true)}>
        <h1 className={styles.headers}> {name} </h1>
        <h1 className={styles.headers}> {movieId} </h1>
        <section>
          <img className={styles.movie_banner} src={source} alt={name} />
        </section>
      </div>

      <MovieInfoPopup
        isOpened={isOpened}
        onClose={() => setIsOpened(false)}
        name={name}
        imageSrc={source}
        movieId={movieId}
      />

      <Button onClick={goToBooking}> Book Ticket </Button>
    </div>
  );
}
