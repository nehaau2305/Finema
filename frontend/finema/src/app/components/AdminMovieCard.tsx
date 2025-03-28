'use client'
import React, { useState } from 'react';
import styles from './MovieCard.module.css';
import EditMoviePopup from './EditMoviePopup';
import Button from './Button';
import { useRouter } from 'next/navigation';

interface AdminMovieCardProps {
  name: string;
  source: string;
  movieId: number; 
  synopsis: string;
  director: string;
  producer: string;
}

export default function AdminMovieCard({ name, source, movieId, synopsis, director, producer }: AdminMovieCardProps) {
  const [isOpened, setIsOpened] = useState(false);

  const router = useRouter();

  function editMovie() {
    setIsOpened(true)

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
      <Button onClick={editMovie}> Edit </Button>
      
      <Button> Delete </Button> {/** This needs to delete movie from database*/}

      <EditMoviePopup
        isOpened={isOpened}
        onClose={() => setIsOpened(false)}
        name={name}
        imageSrc={source}
        movieId={movieId}
        synopsis={synopsis}
        director={director}
        producer={producer}
      />

    </div>
  );
}
