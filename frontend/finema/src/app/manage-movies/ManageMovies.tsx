
'use client'
import React, { useState } from 'react';
import styles from './ManageMovies.module.css'
import TopBar from '../components/TopBar';
import Button from '../components/Button';


export default function ManageMovies() {

  const [showtime, setShowtime] = useState("");
  const [date, setDate] = useState("");
  const [msg, setMsg] = useState("");
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [cast, setCast] = useState('');
  const [director, setDirector] = useState('');
  const [producer, setProducer] = useState('');
  const [trailerVideo, setTrailerVideo] = useState('');
  const [trailerPicture, setTrailerPicture] = useState('');
  const [synopsis, setSynopsis] = useState('');
  const [mpaaRating, setMpaaRating] = useState('');


  const handleShowtime = (event: React.ChangeEvent<HTMLInputElement>) => {
    setShowtime(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const movie = {
      title,
      category,
      director,
      producer,
      trailerVideo,
      mpaaRating,
      trailerPicture,
      synopsis,
    };

    try {
      const response = await fetch('http://localhost:8080/movies/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(movie),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('Movie added:', data);
      setMsg('Movie added successfully!');
      // Reset form fields
      setTitle('');
      setCategory('');
      setDirector('');
      setProducer('');
      setTrailerVideo('');
      setTrailerPicture('');
      setSynopsis('');
      setMpaaRating('');
    } catch (error) {
      console.error('Error adding movie:', error);
      setMsg('Error adding movie.');
    }
  };

  function foo() {
    console.log('PHEW!')
  }

  return (
    <div>
      <div className={styles.top}>
        <TopBar loggedIn={true} showEditProfile={false}/>
      </div>
      <section className={styles.main_body}>
        <section className={styles.movie_info}>
          <form>
            <div className={styles.input_section}>
              <h1> Movie Title </h1>
              <input></input>
            </div>
            <div className={styles.input_section}>
              <h1> Category </h1>
              <input></input>
            </div>
            <div className={styles.input_section}>
              <h1> Cast </h1>
              <input></input>
            </div>
            <div className={styles.input_section}>
              <h1> Director </h1>
              <input></input>
            </div>
            <div className={styles.input_section}>
              <h1> Producer </h1>
              <input></input>
            </div>
            <div className={styles.input_section}>
              <h1> Trailer (video link) </h1>
              <input></input>
            </div>
            <div className={styles.input_section}>
              <h1> MPAA-US film rating code </h1>
              <input></input>
            </div>
            <div className={styles.input_section}>
              <h1> Showtimes </h1>
              <div>
              <label htmlFor="showtime">Select Showtime:</label>
              <input
                type="datetime-local"
                id="showtime"
                value={showtime}
                onChange={handleShowtime}
              />
              {showtime && <p>Selected Showtime: {showtime}</p>}
              </div>
            </div>
            <Button onClick={foo} type='submit'> Add Movie </Button>
          </form>
          </section>
          <h1> lists all movies in database with option to edit or delete </h1>
          <section>
        </section>
      </section>
    </div>
  );
};