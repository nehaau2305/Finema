'use client'
import React from 'react';
import { useState } from 'react';
import styles from './MovieCard.module.css'
import MovieInfoPopup from './MovieInfoPopup'
import Button from './Button'
import { useRouter } from 'next/navigation'

export default function MovieCard({name, source} : {name:string, source:string}) {
  const [isOpened, setIsOpened] = useState(false);

  const router = useRouter()

  function goToBooking() {
      router.push('/show-time')
  }
  return (
    <div className={styles.main_body}>
      <div onClick={() => setIsOpened(true)}>
          <h1 className={styles.headers}> {name} </h1>
          <section>
              <img className={styles.movie_banner} src={source} />
          </section>
      </div>
       {/* <Button onClick={goToBooking}> Book Ticket </Button> {/** We need a way to send the necessary information to the booking page through the info popup or book ticket button */}
      <MovieInfoPopup
            isOpened={isOpened}
            onClose={() => setIsOpened(false)}
            name={name}
            imageSrc={source}
          />
    </div>
  );
};
