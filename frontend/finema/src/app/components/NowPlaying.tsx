'use client'
import React, { useState } from 'react';
import MovieCard from './MovieCard';
import styles from './NowPlaying.module.css'

interface Movie {
  id: string;
  title: string;
  trailerPicture: string;
}

export default function NowPlaying() {
  const [results, setResults] = useState<Movie[]>([]);

  const sendQuery = async () => {
    try {
      const response = await fetch(`http://localhost:8080/movies/search/nowplaying?now=${true}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };
  sendQuery()

  return (
    <div className={styles.main_body}>
        <h1 className={styles.header}>now playing</h1>
        <section>
          <ul>
            {results.length > 0 ? (
              results.map((movie: Movie) => (
                <li key={movie.id}>
                  <MovieCard name={movie.title} source={movie.trailerPicture} />
                </li>
              ))
            ) : (
              <p>No results found</p>
            )}
          </ul>
          {/**<ul className={styles.list}>
            <li><MovieCard name='Time Bandits' source='timebandits.png' /></li>
            <li><MovieCard name='Les Miserables (1952)' source='les-mis.png' /></li>
          </ul>*/}
        </section>
    </div>
  );
};
