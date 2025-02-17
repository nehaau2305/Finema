import React from 'react';
import MovieCard from '../components/MovieCard'
import styles from './ComingSoon.module.css'

export default function ComingSoon() {
  return (
    <div className={styles.main_body}>
        <h1 className={styles.header}>Coming Soon</h1>
        <section>
          <ul className={styles.list}>
            <li><MovieCard name='Time Bandits' source='timebandits.png' /></li>
          </ul>
        </section>
    </div>
  );
};
