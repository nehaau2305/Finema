import { useEffect, useRef } from "react";
import Button from './Button'
import styles from './LoginPopup.module.css'

type Props = {
    isOpened: boolean;
    onClose: () => void;
  };

const LoginPopup = ({
    isOpened,
    onClose,
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


  return (
    <dialog
      ref={ref}
      onCancel={onClose}
    >
        <section className={styles.main_body}>
            <button onClick={onClose}>Close</button>
            <h1>FINEMA</h1>
            <section>
                <h2 className={styles.headers}>email</h2>
                <textarea className={styles.text_fields}></textarea>
            </section>
            <section>
                <h2 className={styles.headers}>password</h2>
                <textarea className={styles.text_fields}></textarea>
            </section>
            <Button onClick={() => 1}>Log In</Button> {/** TODO: Send entered information for login */}
        </section>
    </dialog>
  );
};

export default LoginPopup;