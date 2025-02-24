'use client'
import React from 'react';
//import { useRouter } from 'next/navigation'
//import Button from '../components/Button'
import MovieCard from './MovieCard';
import styles from './NowPlaying.module.css'

export default function NowPlaying() {
  //const router = useRouter()
  
  /*const handleSignUp = () => {
    router.push('/registration')
  }
  const handleLogIn = () => {
    router.push('/loggedin-user-home')
  }*/
  return (
    <div className={styles.main_body}>
        <h1 className={styles.header}>now playing</h1>
        <section>
          <ul className={styles.list}>
            <li><MovieCard name='Time Bandits' source='timebandits.png' /></li>
            <li><MovieCard name='Les Miserables (1952)' source='les-mis.png' /></li>
          </ul>
        </section>
    </div>
  );
};
