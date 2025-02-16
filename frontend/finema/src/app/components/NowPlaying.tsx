'use client'
import React from 'react';
import { useRouter } from 'next/navigation'
import Button from '../components/Button'
import MovieCard from './MovieCard';

export default function NowPlaying() {
  const router = useRouter()
  
  const handleSignUp = () => {
    router.push('/registration')
  }
  const handleLogIn = () => {
    router.push('/loggedin-user-home')
  }
  return (
    <div>
        <h1>Now Playing</h1>
        <section>
            <MovieCard name='time bandits' source='timebandits.png' />
        </section>
    </div>
  );
};
