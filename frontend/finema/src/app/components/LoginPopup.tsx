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
  const [password1, setPassword1] = useState("");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [password2, setPassword2] = useState("");
  const [codeDisplayBool, setCodeDisplayBool] = useState(false)
  const [msg, setMsg] = useState("");

  async function handleReset() {
    // const response = await fetch(``, { //**** Replace with path to send email
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify(""),
    // })
    // .then(response => {
    //   if (response.ok) {
    //     setMsg('Password change successfully');
    //   } else {
    //     setMsg('Error sending email, email incorrect or error occured');
    //   }
    // })
    // .catch(error => console.error('Error sending email:', error));

    setCodeDisplayBool(true)
  }
  async function handleCode() {
    if (password1 !== password2) {
      setMsg("Passwords do not match!")
    }
    const codeAndPasswordAndEmail = {code:code, password:password1, email:email}
    // const response = await fetch(``, { //**** Replace with path to reset password
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify(codeAndPasswordAndEmail),
    // })
    // .then(response => {
    //   if (response.ok) {
    //     setMsg('Password change successfully');
    //   } else {
    //     setMsg('Error changing password, code incorrect or error occured');
    //   }
    // })
    // .catch(error => console.error('Error updating password:', error));

    
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

  const emailDisplay = (
    <dialog
      ref={ref}
      onCancel={onClose}
    >
      <div className={styles.backround_stuff}>
        <section className={styles.main_body}>
          <Button onClick={onClose}>X</Button>
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
  const codeDisplay = (
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
                handleCode()
              }} className={styles.form}>
                <h2 className={styles.headers}>New Password</h2>
                <input value={password1} onChange={(e) => setPassword1(e.target.value)} className={styles.text_fields} required />
                <h2 className={styles.headers}>Confirm Password</h2>
                <input value={password2} onChange={(e) => setPassword2(e.target.value)} className={styles.text_fields} required />
                <h2 className={styles.headers}>Code</h2>
                <input value={code} onChange={(e) => setCode(e.target.value)} className={styles.text_fields} required />
                <Button type='submit'> Change Password </Button>
                {msg && <p>{msg}</p>}
            </form>
        </section>
      </div>
    </dialog>
  );

  return codeDisplayBool ? codeDisplay : emailDisplay;
};

export default LoginPopup;