'use client'
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'
import { useToken } from '../components/useToken'
import SearchMovies from '../components/SearchMovies'
import ComingSoon from '../components/ComingSoon'
import NowPlaying from '../components/NowPlaying'
import styles from './LoggedinUserHome.module.css'
import TopBar from '../components/TopBar';

export default function LoggedinUserHome() {
  const router = useRouter()
  const [token, setToken] = useToken('');
  if (token === 'null') {
    router.push('/web-user-home')
  }
  

  return (
    <div>
      <TopBar loggedIn={(token !== '' ? true : false)}/>
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