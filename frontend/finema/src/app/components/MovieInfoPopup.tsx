import { useEffect, useRef, useState } from "react";
import Button from './Button'
import styles from './MovieInfoPopup.module.css'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

interface Review {
    id: number,
    reviewText: string
}

type Props = {
        isOpened: boolean;
        onClose: () => void;
        name: string;
        imageSrc: string;
        movieId: number;
        synopsis: string;
        director: string;
        producer: string;
        mpaaRating: string;
        cast: string;
        reviews: Review[];
    };

    
interface ShowTime {
    id: number;
    date: string;
    time: string;
}

const MovieInfoPopup = ({
        isOpened,
        onClose,
        name,
        imageSrc,
        movieId,
        mpaaRating,
        synopsis,
        director,
        producer,
        cast,
        reviews
    }: Props) => {
    const ref = useRef<HTMLDialogElement>(null);
    const [trailerUrl, setTrailerUrl] = useState<string | null>(null);
    const [showTimes, setShowTimes] = useState<ShowTime[]>([]);


    useEffect(() => {
        if (isOpened) {
            ref.current?.showModal();
            document.body.classList.add("modal-open");

            //getting movie trailer i hope
            const fetchMovieTrailer = async () => {
                try {
                    const response = await fetch(`http://localhost:8080/movies/${movieId}`)
                    if (!response.ok) {
                        throw new Error('Movie not found :(')
                    }
                    const data = await response.json();
                    setTrailerUrl(data.trailerVideo)
                    console.log('link got', data.trailerVideo)
                } catch (error) {
                    console.error(error)
                }
            }

            // Fetch showtimes for the movie
            const fetchShowTimes = async () => {
                try {
                    const currentDate = new Date().toISOString().split('T')[0]; // Get current date in "YYYY-MM-DD" format
                    const response = await fetch(`http://localhost:8080/showtimes/get-upcoming-by-movie/${movieId}?date=${currentDate}`);
                    if (!response.ok) {
                        throw new Error('Failed to fetch showtimes');
                    }
                    const data: ShowTime[] = await response.json();
                    setShowTimes(data);
                    console.log('Showtimes fetched:', data);
                } catch (error) {
                    console.error('Error fetching showtimes:', error);
                }
            };

            fetchShowTimes();
            fetchMovieTrailer();
        } else {
            ref.current?.close();
            document.body.classList.remove("modal-open");
        }
    }, [isOpened, movieId]);

    const router = useRouter()

    function goToBooking() {
        router.push('/show-time')
    }


  return (
    <dialog
      ref={ref}
      onCancel={onClose}
      className={styles.dialog}
    >
        <section className={styles.main_body}>
            <section className={styles.trailer_name}>
                <button onClick={onClose} className={styles.exit}>X</button>
                <h1 className={styles.header} id={styles.name}> {name} </h1>

                <section id={styles.rating}>
                    Rating:<br/>
                    {mpaaRating}
                </section>

                <section id={styles.synopsis}>
                    Synopsis:<br/>
                    {synopsis}
                </section>
                
                <section id={styles.trailer_border}>
                    {trailerUrl && (
                        <iframe 
                            width="420" 
                            height="315" 
                            src={`https://www.youtube.com/embed/${trailerUrl.split('v=')[1]}`}
                            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        />
                    )}
                   {/* <img src={imageSrc} className={styles.trailer} />*/}
                </section>
            </section>
            <section className={styles.showtimes_book}>
                <section className={styles.showtimes}>
                    <h1 className={styles.header}> Showtimes </h1>
                    <ul className={styles.list}>
                        {showTimes.length > 0 ? (
                            showTimes.map((showTime) => (
                                <li key={showTime.id}>
                                    {showTime.date} - {showTime.time}
                                </li>
                            ))
                        ) : (
                            <p>No showtimes available</p>
                        )}
                    </ul>
                </section>
                <section id={styles.director_producer}>
                    <h1> Directed by: {director} </h1>
                    <h1> Produced by: {producer} </h1>
                    <h1> Cast: {cast} </h1>
                </section>
                <section id={styles.reviews}>
                    <ul>
                        {reviews.length > 0 ? (
                            reviews.map((review: Review) => (
                            <li key={review.id}>
                                {review.reviewText}
                            </li>
                            ))
                        ) : (
                            <p>No reviews found</p>
                        )}
                    </ul>
                </section>
                <div className={styles.button}>
                    <Link href={{
                        pathname: '/show-time',
                        query: {
                            name: name,
                            movieId: movieId,
                            date: showTimes[0]?.date,
                        },
                        }}> Book Tickets 
                    </Link>
                </div>
            </section>
        </section>
    </dialog>
  );
};

export default MovieInfoPopup;