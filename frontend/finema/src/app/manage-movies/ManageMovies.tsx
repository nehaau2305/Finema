
'use client'
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'
import { useToken } from '../components/useToken'
import styles from './ManageMovies.module.css'
import TopBar from '../components/TopBar';
import Button from '../components/Button';
import AdminMovieCard from '../components/AdminMovieCard';

interface MovieCardProps {
  title: string;
  trailerPicture: string;
  id: number; 
  synopsis: string;
  director: string;
  producer: string;
  cast: string;
}

export default function ManageMovies() {

  const [movies, setMovies] = useState<MovieCardProps[]>([]);

  const router = useRouter()

  const [showtime, setShowtime] = useState("");
  const [date, setDate] = useState("");
  const [msg, setMsg] = useState("");
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Action');
  const [cast, setCast] = useState('');
  const [director, setDirector] = useState('');
  const [producer, setProducer] = useState('');
  const [trailerVideo, setTrailerVideo] = useState('');
  const [trailerPicture, setTrailerPicture] = useState('');
  const [synopsis, setSynopsis] = useState('');
  const [mpaaRating, setMpaaRating] = useState('G');
  const [nowShowing, setNowShowing] = useState(false);
  const [comingSoon, setComingSoon] = useState(true);
  const [childTicketPrice, setChildTicketPrice] = useState('');
  const [adultTicketPrice, setAdultTicketPrice] = useState('');
  const [seniorTicketPrice, setSeniorTicketPrice] = useState('');

  const [token, setToken] = useToken('token');
  if (token === '') {
    router.push('/web-user-home')
  }


  const handleShowtime = (event: React.ChangeEvent<HTMLInputElement>) => {
    setShowtime(event.target.value);
  };

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch('http://localhost:8080/movies/now-showing');
        const data = await response.json();
        setMovies(data);
      } catch (error) {
        console.error("Error fetching now showing movies:", error);
      }
    };

    fetchMovies();
  }, []);


  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    //console.log(nowShowing)
    const movie = {
      title,
      category,
      director,
      producer,
      cast,
      trailerVideo,
      mpaaRating,
      trailerPicture,
      synopsis,
      nowShowing,
      comingSoon,
      childTicketPrice,
      adultTicketPrice,
      seniorTicketPrice
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
      setCast('');
      setTrailerVideo('');
      setTrailerPicture('');
      setSynopsis('');
      setMpaaRating('');
      setComingSoon(true);
      setChildTicketPrice('');
      setAdultTicketPrice('');
      setSeniorTicketPrice('');
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
              <select defaultValue={category} onChange={e => setCategory(e.target.value)}>
                <option value="Action">Action</option>
                <option value="Drama">Drama</option>
                <option value="Comedy">Comedy</option>
                <option value="Mystery">Mystery</option>
                <option value="Kids">Kids</option>
                <option value="Horror">Horror</option>
                <option value="Documentary">Documentary</option>
                <option value="Romance">Romance</option>
              </select>
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
              <h1> Cast </h1>
              <input value={cast} onChange={(e) => setCast(e.target.value)} required />
            </div>
            <div className={styles.input_section}>
              <h1> Trailer Video (video link) </h1>
              <input value={trailerVideo} onChange={(e) => setTrailerVideo(e.target.value)} required />
            </div>
            <div className={styles.input_section}>
              <h1> MPAA-US film rating code </h1>
              <select defaultValue={mpaaRating} onChange={e => setMpaaRating(e.target.value)}>
                <option value="G">G</option>
                <option value="PG">PG</option>
                <option value="PG_13">PG13</option>
                <option value="R">R</option>
                <option value="NC_17">NC17</option>
              </select>
            </div>
            <div className={styles.input_section}>
              <h1> Trailer Picture (image link) </h1>
              <input value={trailerPicture} onChange={(e) => setTrailerPicture(e.target.value)} required />
            </div>
            <h1> Ticket Prices: </h1>
            <div className={styles.input_section}>
              <h1> Child: </h1>
              <input type="number" value={childTicketPrice} onChange={(e) => setChildTicketPrice(e.target.value)} required />
            </div>
            <div className={styles.input_section}>
              <h1> Adult: </h1>
              <input type="number" value={adultTicketPrice} onChange={(e) => setAdultTicketPrice(e.target.value)} required />
            </div>
            <div className={styles.input_section}>
              <h1> Senior: </h1>
              <input type="number" value={seniorTicketPrice} onChange={(e) => setSeniorTicketPrice(e.target.value)} required />
            </div>
            <Button type='submit'> Add Movie </Button>
          </form>
          {msg && <p>{msg}</p>}
        </section>
      </section>
    </div>
  );
};