'use client'
import React, { useState, useRef, useEffect } from 'react';
import styles from './SearchMovies.module.css';
import Button from '../components/Button';
import MovieCard from '../components/MovieCard';

interface ButtonProps {
  type?: 'button' | 'submit' | 'reset';
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  children: React.ReactNode;
}

const FilterButton: React.FC<ButtonProps> = ({ type = 'button', onClick, children }) => {
  return (
    <button className={styles.button} type={type} onClick={onClick}>
      {children}
    </button>
  );
};

interface Movie {
  id: number;
  title: string;
  trailerPicture: string;
  synopsis: string;
  director: string;
  producer: string;
  mpaaRating: string;
  cast: string;
}

const categories = ['Action', 'Drama', 'Comedy', 'Mystery', 'Kids', 'Horror', 'Documentary', 'Romance'];

export default function SearchMovies() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Movie[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [error, setError] = useState('');
  const [isOpened, setIsOpened] = useState(false);
  const ref = useRef<HTMLDialogElement>(null);

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

  const fetchMoviesByCategory = async (category: string) => {
    try {
      const response = await fetch(`http://localhost:8080/movies/category?category=${category}`);
      if (!response.ok) {
        throw new Error('Failed to fetch movies for the selected category.');
      }
      const data = await response.json();
      setResults(data);
      setError(''); // Clear any previous errors
    } catch (err) {
      console.error('Error fetching movies by category:', err);
      setError('No movies found for this category.');
      setResults([]);
    }
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    fetchMoviesByCategory(category);
  };

  useEffect(() => {
    if (isOpened) {
      ref.current?.showModal();
      document.body.classList.add('modal-open');
    } else {
      ref.current?.close();
      document.body.classList.remove('modal-open');
    }
  }, [isOpened]);

  return (
    <section className={styles.main_body}>
      <dialog ref={ref} className={styles.dialog}>
        <section className={styles.modal_body}>
          <section className={styles.modal_button}>
            <Button onClick={() => setIsOpened(false)}> X </Button>
          </section>
          <section className={styles.filter_section}>
            {categories.map((category) => (
              <Button
                key={category}
                onClick={() => handleCategoryChange(category)}
                type="button"
              >
                {category}
              </Button>
            ))}
          </section>
        </section>
      </dialog>
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
        <h2> Filter by: </h2>
        <Button onClick={() => setIsOpened(true)}> Categories </Button>
        <Button onClick={() => setIsOpened(true)}> ShowTimes </Button>
      </section>
      <section className={styles.grid_container}>
        {results.length > 0 ? (
          results.map((movie: Movie) => (
            <div key={movie.id} className={styles.grid_item}>
              <MovieCard
                name={movie.title}
                source={movie.trailerPicture}
                mpaaRating={movie.mpaaRating}
                movieId={movie.id}
                synopsis={movie.synopsis}
                director={movie.director}
                producer={movie.producer}
                cast={movie.cast}
              />
            </div>
          ))
        ) : (
          <p className={styles.no_results}>No results found</p>        )}
      </section>
    </section>
  );
}