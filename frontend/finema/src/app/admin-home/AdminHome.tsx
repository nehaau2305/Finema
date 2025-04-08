
'use client'
import React from 'react';
import styles from './AdminHome.module.css'
import { useRouter } from 'next/navigation'
import { useToken } from '../components/useToken'
import TopBar from '../components/TopBar';
import Button from '../components/Button'

export default function AdminHome() {

  const router = useRouter();
  const [token, setToken] = useToken('');
  if (token === null) {
    router.push('/web-user-home')
  }

  const handleManageMovies = () => {
    router.push('/manage-movies')
  }

  const handleScheduleMovies = () => {
    router.push('/pick-date')
  }

  const handleManageUsers = () => {
    router.push('/manage-users')
  }

  const handleManagePromotions = () => {
    router.push('/manage-promotions')
  }

  return (
    <div>
      <TopBar loggedIn={true}/>
      <section className={styles.main_body}>
        <section className={styles.buttons_container}>
          <Button onClick={handleManageMovies}>Manage Movies</Button>
          <Button onClick={handleScheduleMovies}>Schedule Movies</Button>
          <Button onClick={handleManageUsers}>Manage Users</Button>
          <Button onClick={handleManagePromotions}>Manage Promotions</Button>
        </section>
      </section>
    </div>
  );
};