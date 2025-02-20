'use client'
import React, { useState } from 'react';
import styles from './SearchMovies.module.css'
import Button from '../components/Button'
import MovieCard from '../components/MovieCard'

interface ButtonProps {
type?: 'button' | 'submit' | 'reset';
onClick?: React.MouseEventHandler<HTMLButtonElement>;
children: React.ReactNode;
}

const FilterButton: React.FC<ButtonProps> = ({ type = 'button', onClick, children }) => {
return (
    <button
    className={styles.button}
    type={type}
    onClick={onClick}
    >
    {children}
    </button>
);
};

interface Movie {
  id: string;
  title: string;
  trailerPicture: string;
}

export default function SearchMovies() {
  
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Movie[]>([]);

  const sendQuery = async () => {
    if (query.trim() === '') return;

    try {
      const response = await fetch(`http://localhost:8080/movies/search?query=${query}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };
  const setFilter = () => {
    {/* TODO: Send Filter Query to database to retrieve relevant movies */}
  }
  
  return (
    <section className={styles.main_body}>
      <h1>Search Movies</h1>
      <section>
        <input
          type="text"
          className={styles.search_section}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for movies..."
        />
        <Button onClick={sendQuery}>Go</Button>
      </section>
      <section className={styles.filter_section}>
        Search By:
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
      </section>
    </section>
  );
};
