import React, { useState } from 'react';
import MovieCard from '../components/MovieCard'
import styles from './ComingSoon.module.css'

interface Movie {
  id: number;
  title: string;
  trailerPicture: string;
  coming_soon: boolean;
}

export default function ComingSoon() {
  const [results, setResults] = useState<Movie[]>([]);

  const sendQuery = async () => {
    try {
      const response = await fetch(`http://localhost:8080/movies/all`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setResults(data.filter((movie:Movie) => movie.coming_soon));
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };
  sendQuery()
  
  return (
    <div className={styles.main_body}>
        <h1 className={styles.header}>coming soon</h1>
        <section>
          <ul>
            {results.length > 0 ? (
              results.map((movie: Movie) => (
                <li key={movie.id}>
                  <MovieCard name={movie.title} source={movie.trailerPicture} movieId={movie.id} />
                </li>
              ))
            ) : (
              <p>No results found</p>
            )}
          </ul>
          
          
          {/**<ul className={styles.list}>
            <li><MovieCard name='Time Bandits' source='timebandits.png' /></li>
          </ul>*/}
        </section>
    </div>
  );
};
