import { useEffect, useRef, useState } from "react";
import Button from './Button';
import styles from './MovieInfoPopup.module.css';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface Review {
    id: number;
    reviewText: string;
    userId: number;
    movieId: number;
    userName: string;
    rating: number;
    user: User;
}

interface User {
    id: number;
    name: string;
    phone?: string;
    email: string;
    homeAddress?: string;
    isAdmin: boolean;
    token?: string;
    active: boolean;
    suspended: boolean;
    promotions: boolean;
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
}: Props) => {
    const ref = useRef<HTMLDialogElement>(null);
    const [trailerUrl, setTrailerUrl] = useState<string | null>(null);
    const [showTimes, setShowTimes] = useState<ShowTime[]>([]);
    const [reviews, setReviews] = useState<Review[]>([]);
    const [currentUser, setCurrentUser] = useState<User | null>(null); // State for the current user
    const [isReviewPopupOpen, setIsReviewPopupOpen] = useState(false);
    const [reviewText, setReviewText] = useState('');
    const [reviewRating, setReviewRating] = useState(1);
    const [errorMessage, setErrorMessage] = useState<string | null>(null); // State for error message

    useEffect(() => {
        if (isOpened) {
            ref.current?.showModal();
            document.body.classList.add("modal-open");

            const fetchCurrentUser = async () => {
                try {
                    const response = await fetch(`http://localhost:8080/users/profile`, {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${localStorage.getItem('token')}`, // Include token if required
                        },
                    });
                    if (!response.ok) {
                        throw new Error('Failed to fetch current user');
                    }
                    const userData: User = await response.json();
                    setCurrentUser(userData);
                } catch (error) {
                    console.error('Error fetching current user:', error);
                }
            };

            const fetchMovieTrailer = async () => {
                try {
                    const response = await fetch(`http://localhost:8080/movies/${movieId}`);
                    if (!response.ok) {
                        throw new Error('Movie not found :(');
                    }
                    const data = await response.json();
                    setTrailerUrl(data.trailerVideo);
                } catch (error) {
                    console.error(error);
                }
            };

            const fetchShowTimes = async () => {
                try {
                    const currentDate = new Date().toLocaleString('fr-CA', { timeZone: 'America/New_York' }).split(' ')[0];
                    const response = await fetch(`http://localhost:8080/showtimes/get-upcoming-by-movie/${movieId}?date=${currentDate}`);
                    if (!response.ok) {
                        throw new Error('Failed to fetch showtimes');
                    }
                    const data: ShowTime[] = await response.json();
                    setShowTimes(data);
                } catch (error) {
                    console.error('Error fetching showtimes:', error);
                }
            };

            fetchCurrentUser();
            fetchShowTimes();
            fetchMovieTrailer();
        } else {
            ref.current?.close();
            document.body.classList.remove("modal-open");
        }
    }, [isOpened, movieId]);

    useEffect(() => {
        if (isOpened) {
            const fetchReviewsWithUsernames = async () => {
                try {
                    const response = await fetch(`http://localhost:8080/review/movie/${movieId}`);
                    if (!response.ok) {
                        throw new Error('Failed to fetch reviews');
                    }
                    const reviewsData: Review[] = await response.json();
                    setReviews(reviewsData);
                } catch (error) {
                    console.error('Error fetching reviews:', error);
                }
            };

            fetchReviewsWithUsernames();
        }
    }, [isOpened, movieId]);

    const handleOpenReviewPopup = () => {
        if (!currentUser) {
            setErrorMessage("You must be logged in to leave reviews."); // Set error message
            return;
        }
        setErrorMessage(null); // Clear any previous error message
        setIsReviewPopupOpen(true); // Open the review popup if the user is logged in
    };

    const handleAddReview = async () => {
        try {
            const response = await fetch(`http://localhost:8080/review/add`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    movieId: movieId,
                    reviewText,
                    rating: reviewRating,
                    userId: currentUser?.id, // Use the current user's ID
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to add review');
            }

            const newReview = await response.json();
            setReviews((prevReviews) => [...prevReviews, newReview]);
            setIsReviewPopupOpen(false);
            setReviewText('');
            setReviewRating(1);
        } catch (error) {
            console.error('Error adding review:', error);
        }
    };

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
                        Rating:<br />
                        {mpaaRating}
                    </section>

                    <section id={styles.synopsis}>
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
                    </section>
                    <br />
                    <br />
                    <br />                  
                    <div className={styles.button}>
                        <Link href={{
                            pathname: '/show-time',
                            query: {
                                name: name,
                                movieId: movieId,
                                date: showTimes[0]?.date,
                            },
                        }}
                        id={styles.link}> Book Tickets
                        </Link>
                    </div>
                </section>
                <section className={styles.showtimes_book}>   
                    <section className={styles.showtimes}>
                        <h1 className={styles.header}> Showtimes </h1>
                        <ul className={styles.list}>
                            {showTimes.length > 0 ? (
                                showTimes.map((showTime) => (
                                    <li key={showTime.id} className={styles.showtime}>
                                        {showTime.date} - {timeLabels[showTime.time as ConsecutiveTimes]}
                                    </li>
                                ))
                            ) : (
                                <p> No showtimes available </p>
                            )}
                        </ul>
                    </section>
                    <section id={styles.director_producer}>
                        <h1> Directed by: {director} </h1>
                        <h1> Produced by: {producer} </h1>
                        <h1> Cast: {cast} </h1>
                    </section> 
                    <br />
                    <div id={styles.review_area}>
                        <section id={styles.reviews}>  
                            <h2>Reviews</h2>
                            <ul>
                                {reviews.length > 0 ? (
                                    reviews.map((review: Review) => (
                                        <li key={review.id} className={styles.review_item}>
                                            <p><strong>{review.user.name}</strong> - <span>{review.rating}/5</span></p>
                                            <p>{review.reviewText}</p>
                                        </li>
                                    ))
                                ) : (
                                    <p>No reviews found</p>
                                )}
                            </ul>
                        </section>
                        <Button onClick={handleOpenReviewPopup}>Add Review</Button>
                    </div>
                    {errorMessage && (
                        <p className={styles.error_message}>{errorMessage}</p>
                    )}
                    <br />
                    <br />
                    <br />
                    {isReviewPopupOpen && (
                        <dialog className={styles.review_popup} open>
                            <h2>Add a Review</h2>
                            <textarea
                                placeholder="Write your review here..."
                                value={reviewText}
                                onChange={(e) => setReviewText(e.target.value)}
                                className={styles.review_textarea}
                            />
                            <div className={styles.rating_section}>
                                <label htmlFor="rating">Rating:</label>
                                <select
                                    id="rating"
                                    value={reviewRating}
                                    onChange={(e) => setReviewRating(Number(e.target.value))}
                                >
                                    {[1, 2, 3, 4, 5].map((rating) => (
                                        <option key={rating} value={rating}>
                                            {rating}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className={styles.popup_buttons}>
                                <Button onClick={handleAddReview}>Submit</Button>
                                <Button onClick={() => setIsReviewPopupOpen(false)}>Cancel</Button>
                            </div>
                        </dialog>
                    )}
                </section>
            </section>
        </dialog>
    );
};

export default MovieInfoPopup;