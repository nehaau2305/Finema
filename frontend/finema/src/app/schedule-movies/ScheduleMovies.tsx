'use client'
import React, { useState, useEffect, useRef } from "react";
import styles from './ScheduleMovies.module.css'
import TopBar from '../components/TopBar';
import Button from '../components/Button';
import { useRouter } from 'next/navigation'
import { useToken } from '../components/useToken'
import MovieCard from '../components/MovieCard';

interface Showtime {
  showtimeID: number;
  movieID: number;
  date: string;
  time: string;
  showroomID: number;
}

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

interface Showroom {
  id: number;
}

type ConsecutiveTimes =
  | 'TWELVE_AM'
  | 'THREE_AM'
  | 'SIX_AM'
  | 'NINE_AM'
  | 'TWELVE_PM'
  | 'THREE_PM'
  | 'SIX_PM'
  | 'NINE_PM';

type AvailableShowroomsMap = {
  [key in ConsecutiveTimes]?: Showroom[];
};

const timeLabels: { [key in ConsecutiveTimes]: string } = {
  TWELVE_AM: '12:00 AM',
  THREE_AM: '3:00 AM',
  SIX_AM: '6:00 AM',
  NINE_AM: '9:00 AM',
  TWELVE_PM: '12:00 PM',
  THREE_PM: '3:00 PM',
  SIX_PM: '6:00 PM',
  NINE_PM: '9:00 PM',
};
  
export default function ScheduleMovies() {

    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const router = useRouter();
    const [token, setToken] = useToken('token');
    const [savedDateString, setSavedDateString] = useToken('selectedDate');
    const [showtimes, setShowtimes] = useState<Showtime[]>([]);
    const [availableShowrooms, setAvailableShowrooms] = useState<AvailableShowroomsMap>({});

    useEffect(() => {
        if (savedDateString) {
            setSelectedDate(new Date(savedDateString));
            console.log('saved date string: ', savedDateString);
        }
        if (token === '') {
            router.push('/web-user-home');
        } 
    }, [token, router]);


    useEffect(() => {
        if (selectedDate) {
          console.log('Selected Date before fetch:', selectedDate);
          const formattedDate = selectedDate.toISOString().split('T')[0];  // Convert to proper format
          console.log('Formatted date: ', formattedDate);
          fetch(`http://localhost:8080/showtimes/available-showrooms?date=${formattedDate}`, {
                method: 'GET',
                headers: {
                  'Authorization': `Bearer ${token}`,
                  'Content-Type': 'application/json'
                }
              })
              .then(response => response.json())
              .then(data => {
                console.log(data)
                //setShowtimes(data);
                setAvailableShowrooms(data);
              })
              .catch(error => console.error('Error fetching showtimes:', error));
        }
    }, [token, selectedDate]);

    const [isOpened, setIsOpened] = useState(false);
    const ref = useRef<HTMLDialogElement>(null);

    useEffect(() => {
      if (isOpened) {
        ref.current?.showModal();
        document.body.classList.add('modal-open');
      } else {
        ref.current?.close();
        document.body.classList.remove('modal-open');
      }
    }, [isOpened]);

    const [currentTime, setCurrentTime] = useState<string>();
    const [currentShowroom, setCurrentShowroom] = useState<number>();

    const handleOpeningModal = ({id, time}: {id:number,time:string}) => {
      setCurrentTime(time);
      setCurrentShowroom(id);
      setIsOpened(true);
    }

    const [isLoading, setIsLoading] = useState(true);
    const [query, setQuery] = useState('');
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
    const [results, setResults] = useState<Movie[]>([]);

    const handleSelectMovie = (movieID:number) => {
      const reservation = {time: currentTime, showroom: currentShowroom, movie: movieID}
      fetch(`http://localhost:8080`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })
      .then(response => response.json())
      .then(data => {
        console.log(data)
      })
      .catch(error => console.error('Error fetching showtimes:', error));
    }

    return (
      <div>
        <dialog ref={ref} className={styles.dialog}>
          <section className={styles.modal_body}>
            <section className={styles.modal_button}>
              <Button onClick={() => setIsOpened(false)}> X </Button>
            </section>
            <h1 className={styles.headers}> Add a movie for Showroom {currentShowroom} </h1>
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
            <section className={styles.grid_container}>
              {results.length > 0 ? (
                results.map((movie: Movie) => (
                  <div key={movie.id} onClick={() => handleSelectMovie(movie.id)} className={styles.movie_card}>
                    <h1> {movie.title} </h1>
                    <h1> {movie.mpaaRating} </h1>
                    <section>
                      <img className={styles.movie_banner} src={movie.trailerPicture} alt={movie.title} />
                    </section>
                  </div>
                ))
              ) : (
                <p className={styles.no_results}>No results found</p>        )}
            </section>
          </section>
        </dialog>
        <TopBar loggedIn={true} showEditProfile={false}/>

        <section className={styles.main_body}>
          <h1 className={styles.date_header}> Date: {selectedDate ? selectedDate.toDateString() : "No date selected"}</h1>

          <ul className={styles.showroom_box}>
            {Object.entries(availableShowrooms).map(([time, showrooms]) => (
              <li key={time} className={styles.time_slot}>
                <h2 className={styles.time_header}>{timeLabels[time as ConsecutiveTimes]}</h2>
                  {showrooms && showrooms.length > 0 ? (
                  <ul>
                    {showrooms.map((showroom) => (
                      <li key={showroom.id}>
                        <button onClick={() => handleOpeningModal({time:time, id:showroom.id})} className={styles.button}> Showroom {showroom.id} </button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No available showrooms for this time.</p>
                )}
              </li>
            ))}
          </ul>
        </section>
      </div>
  );
};