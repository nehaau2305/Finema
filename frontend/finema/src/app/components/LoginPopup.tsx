import { useEffect, useRef, useState } from "react";
import Button from './Button'
import styles from './LoginPopup.module.css'
import Image from 'next/image'
import finemalogo from './finemalogo.png'

type Props = {
    isOpened: boolean;
    onClose: () => void;
  };

const LoginPopup = ({
    isOpened,
    onClose,
  }: Props) => {
  const ref = useRef<HTMLDialogElement>(null);
  const [email, setEmail] = useState("");

  async function handleReset() {
    // const response = await fetch(``, { // Replace with path
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify(""),
    // })
  
    // if (!response.ok) {
    //   console.log(response);
    //   throw new Error('Network response was not ok');
    // } else {
    //   console.log("response is ok");
    //   console.log(response);
    // }
    
    // const data = await response.text();
    // console.log('Password reset:', data);
    onClose()
  }

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
      <div className={styles.backround_stuff}>
        <section className={styles.main_body}>
          <div>
            <Image
              src={finemalogo}
              width={200}
              height={200}
              alt="finema logo"
              />
          </div>
            <form onSubmit={(e) => {
                e.preventDefault()
                handleReset()
              }} className={styles.form}>
                <h2 className={styles.headers}>email</h2>
                <input value={email} onChange={(e) => setEmail(e.target.value)} className={styles.text_fields} required />
                <Button type='submit'>Send Reset Email</Button>
            </form>
        </section>
      </div>
    </dialog>
  );
};

export default LoginPopup;