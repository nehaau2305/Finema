'use client'
import React from 'react';
//import LoggedinUserTopBar from '../components/LoggedinUserTopBar'
import SearchMovies from '../components/SearchMovies'
import ComingSoon from '../components/ComingSoon'
import NowPlaying from '../components/NowPlaying'
import styles from './LoggedinUserHome.module.css'
import TopBar from '../components/TopBar';

export default function LoggedinUserHome() {
  return (
    <div>
      <TopBar loggedIn={true}/>
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