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

export default function LoggedinUserHome() {
  const router = useRouter()
  // useEffect(() => {
  //   if (token === 'null') {
  //     router.push('/web-user-home')
  //   }
  // }, [token]);

  const displayToken = () => {
    console.log(token)
  }
  
  const [token, setToken] = useToken();
  console.log("The token everyone!" + token)
  useEffect(() => {
    console.log("The token everyone!" + token)
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
      <Button onClick={displayToken}>Token</Button>
    </div>
  );
};