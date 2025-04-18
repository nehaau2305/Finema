'use client'
import React, {useEffect} from 'react';
import styles from './WebUserHome.module.css'
import { useRouter } from 'next/navigation'
import { useToken } from '../components/useToken'
import TopBar from '../components/TopBar'
import SearchMovies from '../components/SearchMovies'
import NowPlaying from '../components/NowPlaying'
import ComingSoon from '../components/ComingSoon'

export default function WebUserHome() {
  const router = useRouter()
  const [token, setToken] = useToken('token');
  useEffect(()=> {
    if (token != '') {
      router.push('/loggedin-user-home')
    }
  }, [])
  
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

