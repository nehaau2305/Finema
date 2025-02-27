import { useEffect, useRef, useState } from "react";
import Button from './Button'
import styles from './MovieInfoPopup.module.css'
import { useRouter } from 'next/navigation'

type Props = {
        isOpened: boolean;
        onClose: () => void;
        name: string;
        imageSrc: string;
        movieId: number;
    };

const MovieInfoPopup = ({
        isOpened,
        onClose,
        name,
        imageSrc,
        movieId,
    }: Props) => {
    const ref = useRef<HTMLDialogElement>(null);
    const [trailerUrl, setTrailerUrl] = useState<string | null>(null);

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
    >
        <section className={styles.main_body}>
            <section className={styles.trailer_name}>
                <button onClick={onClose} className={styles.exit}>X</button>
                <h1 className={styles.header} id={styles.name}> {name} </h1>
                
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
                        <li> 4:15 </li>
                        <li> 4:15 </li>
                        <li> 4:15 </li>
                        <li> 4:15 </li>
                        <li> 4:15 </li>
                        <li> 4:15 </li>
                    </ul>
                </section>
                <div className={styles.button}>
                    <Button onClick={goToBooking}> Book Tickets </Button>
                </div>
            </section>
        </section>
    </dialog>
  );
};

export default MovieInfoPopup;