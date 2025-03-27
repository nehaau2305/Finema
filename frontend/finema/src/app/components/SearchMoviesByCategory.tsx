'use client'
import React, { useState } from 'react';
import styles from './SearchMovies.module.css';
import Button from '../components/Button';
import MovieCard from '../components/MovieCard';

interface Movie {
  id: number;
  title: string;
  trailerPicture: string;
  synopsis: string;
  director: string;
  producer: string;
}

const categories = ['Action', 'Drama', 'Comedy', 'Mystery', 'Kids', 'Horror', 'Documentary'];

export default function SearchByCategory() {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [results, setResults] = useState<Movie[]>([]);
  const [error, setError] = useState('');

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

  return (
    <section className={styles.main_body}>
      <h1>Search Movies by Category</h1>
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
      <section className={styles.results_section}>
        <h2>Results for: {selectedCategory || 'None'}</h2>
        {error && <p className={styles.error}>{error}</p>}
        <ul>
          {results.length > 0 ? (
            results.map((movie: Movie) => (
              <li key={movie.id}>
                <MovieCard
                  name={movie.title}
                  source={movie.trailerPicture}
                  movieId={movie.id}
                  synopsis={movie.synopsis}
                  director={movie.director}
                  producer={movie.producer}
                />
              </li>
            ))
          ) : (
            !error && <p>No results found</p>
          )}
        </ul>
      </section>
    </section>
  );
}