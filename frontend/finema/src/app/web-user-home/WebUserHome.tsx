'use client'
import React from 'react';
import styles from './WebUserHome.module.css'
import WebUserTopBar from '../components/WebUserTopBar'
import SearchMovies from '../components/SearchMovies'
import NowPlaying from '../components/NowPlaying'
import ComingSoon from '../components/ComingSoon'

export default function WebUserHome() {
  return (
    <div>
      <WebUserTopBar />
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

