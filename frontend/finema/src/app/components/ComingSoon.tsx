
import MovieCard from '../components/MovieCard'
import styles from './ComingSoon.module.css'
import React, { useState, useEffect } from 'react';

interface MovieCardProps {
  title: string;
  trailerPicture: string;
  id: number; 
  synopsis: string;
  director: string;
  producer: string;
  mpaaRating: string;
  cast: string;
}


export default function ComingSoon() {
  const [comingSoonMovies, setComingSoonMovies] = useState<MovieCardProps[]>([]);

  // fetch coming soon movies from backend
  useEffect(() => {
    const fetchComingSoonMovies = async () => {
      try {
        const response = await fetch('http://localhost:8080/movies/coming-soon');
        const data = await response.json();
        setComingSoonMovies(data);
      } catch (error) {
        console.error("Error fetching coming soon movies:", error);
      }
    };

    fetchComingSoonMovies();
  }, []);

  // display the coming soon movies
  return (
    <div className={styles.main_body}>
        <h1 className={styles.header}>coming soon</h1>
        <section>
          <ul className={styles.list}>
            {/*<li><MovieCard name='Time Bandits' source='timebandits.png' /></li>*/}
            {comingSoonMovies.length > 0 ? (
            comingSoonMovies.map((movie) => (
              <li key={movie.id}>
                <MovieCard 
                name={movie.title} 
                source={movie.trailerPicture} 
                movieId={movie.id} 
                mpaaRating={movie.mpaaRating}
                synopsis={movie.synopsis}
                director={movie.director}
                producer={movie.producer}
                cast={movie.cast}
                />
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
