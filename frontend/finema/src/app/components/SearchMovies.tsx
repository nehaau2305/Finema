'use client'
import React from 'react';
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

export default function SearchMovies() {
  
  const sendQuery = () => {
    {/* TODO: Send Query to database to retrieve relevant movies */}
  }
  const setFilter = () => {
    {/* TODO: Send Filter Query to database to retrieve relevant movies */}
  }
  return (
    <section className={styles.main_body}>
        <h1>Search Movies</h1>
        <section className={styles.search_section}>
            <textarea className={styles.search_box} defaultValue="Search"></textarea>
            <Button onClick={sendQuery}>Go</Button>
        </section>
        <section className={styles.filter_section}> 
            Search By:
            <FilterButton onClick={setFilter}>Title</FilterButton>
            <FilterButton onClick={setFilter}>Genre</FilterButton>
            <FilterButton onClick={setFilter}>Show Date</FilterButton>
        </section>
        <section className={styles.movie_section}>
            <MovieCard name='time bandits' source='timebandits.png' /> {/* TODO: Make into for loop from results */}
        </section>
    </section>
  );
};
