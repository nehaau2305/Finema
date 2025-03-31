'use client'
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'
import { useToken } from '../components/useToken'
import Button from '../components/Button';
import SearchMovies from '../components/SearchMovies'
import ComingSoon from '../components/ComingSoon'
import NowPlaying from '../components/NowPlaying'
import styles from './LoggedinUserHome.module.css'
import TopBar from '../components/TopBar';
import SearchByCategory from '../components/SearchMoviesByCategory';

export default function LoggedinUserHome() {
  const router = useRouter()
  const [token, setToken] = useToken('token');
  useEffect(() => {
    if (token === '') {
      router.push('/web-user-home')
    }
  }, [token]);
  
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