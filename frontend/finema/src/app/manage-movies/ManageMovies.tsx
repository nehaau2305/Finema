
'use client'
import React, { useState } from 'react';
import { useRouter } from 'next/navigation'
import { useToken } from '../components/useToken'
import styles from './ManageMovies.module.css'
import TopBar from '../components/TopBar';
import Button from '../components/Button';


export default function ManageMovies() {
  const router = useRouter()

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
  const [nowShowing, setNowShowing] = useState(false);
  const [comingSoon, setComingSoon] = useState(false);

  const [token, setToken] = useToken('token');
  if (token === '') {
    router.push('/web-user-home')
  }


  const handleShowtime = (event: React.ChangeEvent<HTMLInputElement>) => {
    setShowtime(event.target.value);
  };



  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    //console.log(nowShowing)
    const movie = {
      title,
      category,
      director,
      producer,
      trailerVideo,
      mpaaRating,
      trailerPicture,
      synopsis,
      nowShowing,
      comingSoon
    };
    //console.log(movie.nowShowing)
    try {
      //const response = await fetch(`http://localhost:8080/movies/search?query=${query}`);
      //console.log(JSON.stringify(movie))
      const response = await fetch(`http://localhost:8080/movies/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token,
        },
        body: JSON.stringify(movie),
      });

      if (!response.ok) {
        console.log(response);
        throw new Error('Network response was not ok');
      } else {
        console.log("response is ok");
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
      setComingSoon(false);
      setNowShowing(false);
    } catch (error) {
      console.error('Error adding movie:', error);
      setMsg('Error adding movie.');
    }
  };

  return (
    <div>
      <div className={styles.top}>
        <TopBar loggedIn={true} showEditProfile={false}/>
      </div>
      <section className={styles.main_body}>
        <section className={styles.movie_info}>
          <form onSubmit={handleSubmit}>
            <div className={styles.input_section}>
              <h1> Movie Title </h1>
              <input value={title} onChange={(e) => setTitle(e.target.value)} required />
            </div>
            <div className={styles.input_section}>
              <h1> Category </h1>
              <input value={category} onChange={(e) => setCategory(e.target.value)} required />
            </div>
            <div className={styles.input_section}>
              <h1> Synopsis </h1>
              <input value={synopsis} onChange={(e) => setSynopsis(e.target.value)} required />
            </div>
            <div className={styles.input_section}>
              <h1> Director </h1>
              <input value={director} onChange={(e) => setDirector(e.target.value)} required />
            </div>
            <div className={styles.input_section}>
              <h1> Producer </h1>
              <input value={producer} onChange={(e) => setProducer(e.target.value)} required />
            </div>
            <div className={styles.input_section}>
              <h1> Trailer Video (video link) </h1>
              <input value={trailerVideo} onChange={(e) => setTrailerVideo(e.target.value)} required />
            </div>
            <div className={styles.input_section}>
              <h1> MPAA-US film rating code </h1>
              <input value={mpaaRating} onChange={(e) => setMpaaRating(e.target.value)} required />
            </div>
            <div className={styles.input_section}>
              <h1> Trailer Picture (image link) </h1>
              <input value={trailerPicture} onChange={(e) => setTrailerPicture(e.target.value)} required />
            </div>
            <div>
              <h1>Now Playing</h1>
              <input
                type="checkbox"
                value='true'
                checked={nowShowing === true}
                onChange={() => setNowShowing(true)}
              />
            </div>
            <div>
              <h1>Coming Soon</h1>
                <input
                  type="checkbox"
                  value='true'
                  checked={comingSoon === true}
                  onChange={() => setComingSoon(true)}
               />
            </div>
            <Button type='submit'> Add Movie </Button>
          </form>
          {msg && <p>{msg}</p>}
        </section>
        <h1> lists all movies in database with option to edit or delete </h1>
        <section>
          {/* TODO: Implement movie list with edit and delete options */}
        </section>
      </section>
    </div>
  );
};