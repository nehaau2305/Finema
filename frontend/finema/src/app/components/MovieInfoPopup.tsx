import { useEffect, useRef } from "react";
import Button from './Button'
import styles from './MovieInfoPopup.module.css'
import { useRouter } from 'next/navigation'

type Props = {
        isOpened: boolean;
        onClose: () => void;
        name: string;
        imageSrc: string;
    };

const MovieInfoPopup = ({
        isOpened,
        onClose,
        name,
        imageSrc,
    }: Props) => {
    const ref = useRef<HTMLDialogElement>(null);

    useEffect(() => {
        if (isOpened) {
            ref.current?.showModal();
            document.body.classList.add("modal-open");
        } else {
            ref.current?.close();
            document.body.classList.remove("modal-open");
        }
    }, [isOpened]);

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
                    <img src={imageSrc} className={styles.trailer} />
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