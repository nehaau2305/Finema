'use client'
import React, { useState, useEffect } from 'react';
//import { useRouter } from 'next/navigation'
//import Button from '../components/Button'
import MovieCard from './MovieCard';
import styles from './NowPlaying.module.css'

interface MovieCardProps {
  title: string;
  trailerPicture: string;
  id: number; 
}

export default function NowPlaying() {
  //const router = useRouter()
  
  /*const handleSignUp = () => {
    router.push('/registration')
  }
  const handleLogIn = () => {
    router.push('/loggedin-user-home')
  }*/

  const [nowShowingMovies, setNowShowingMovies] = useState<MovieCardProps[]>([]);
  
    // fetch coming soon movies from backend
    useEffect(() => {
      const fetchNowShowingMovies = async () => {
        try {
          const response = await fetch('http://localhost:8080/movies/now-showing');
          const data = await response.json();
          setNowShowingMovies(data);
        } catch (error) {
          console.error("Error fetching now showing movies:", error);
        }
      };
  
      fetchNowShowingMovies();
    }, []);
  

  return (
    <div className={styles.main_body}>
        <h1 className={styles.header}>now playing</h1>
        <section>
          <ul className={styles.list}>
            {/*<li><MovieCard name='Time Bandits' source='timebandits.png' /></li>*/}
            {/*<li><MovieCard name='Les Miserables (1952)' source='les-mis.png' /></li>*/}
            {nowShowingMovies.length > 0 ? (
              nowShowingMovies.map((movie) => (
                <li key={movie.id}>
                  <MovieCard name={movie.title} source={movie.trailerPicture} movieId={movie.id} />
                </li>
               ))
              ) : (
                <p>No coming soon movies available at the moment.</p>
            )}
          </ul>
        </section>
    </div>
  );
};
