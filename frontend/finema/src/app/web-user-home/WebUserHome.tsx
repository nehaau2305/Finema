'use client'
import React from 'react';
import styles from './WebUserHome.module.css'
import TopBar from '../components/TopBar'
import SearchMovies from '../components/SearchMovies'
import NowPlaying from '../components/NowPlaying'
import ComingSoon from '../components/ComingSoon'

export default function WebUserHome() {
  return (
    <div>
      <TopBar loggedIn={false}/>
      <section className={styles.main_body}>
        <SearchMovies />
        <section className={styles.movies_body}>
          <NowPlaying />
          <ComingSoon />
        </section>
      </section>
    </div>
  );
};

