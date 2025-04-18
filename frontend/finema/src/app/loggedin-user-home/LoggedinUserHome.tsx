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
  const [token, setToken] = useToken('token');
  const [isAdmin, setIsAdmin] = useState(false)
  useEffect(() => {
    if (token === '') {
      router.push('/web-user-home')
    }
  }, [token]);

  useEffect(() => {
    fetch(`http://localhost:8080/users/profile`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,  // Pass token in the Authorization header
      }
    })
    .then(response => response.json())
    .then(data => {
      setIsAdmin(data.isAdmin)
    })
    .catch(error => console.error('Error fetching user data:', error))
  }, []);
  
  return (
    <div>
        <TopBar loggedIn={(token !== '' ? true : false)} isAdmin={isAdmin}/>
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