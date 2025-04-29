'use client'
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'
import Button from '../components/Button'
import styles from './Reset.module.css'
import Image from 'next/image'
import finemalogo from './finemalogo.png'

async function sendNewPassword(password:string, token:string) {
  fetch('http://localhost:8080/auth/password-change-after-forgot', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({password:password, token:token})
  })
  .then(async response => {
    if (response.ok) {
      alert('Password updated successfully');
    } else {
      const errorData = await response.text();
      alert('Error updating password: ' + errorData);
    }
  })
  .catch(error => console.error('Error updating password:', error));
};

export default function Reset() {
  const router = useRouter();
  const [password1, setPassword1] = useState("");
  //const [email, setEmail] = useState("");
  const [token, setToken] = useState<string | null>(null);
  const [password2, setPassword2] = useState("");
  const [msg, setMsg] = useState("");

  const handleReset = (e:any) => {
    e.preventDefault()
    if (password1 === password2) {
      const urlParams = new URLSearchParams(window.location.search);
      const token = urlParams.get("token");
      if (token != null) {
        sendNewPassword(password1, token).then((result)=> {
          setMsg("Reset Successfull!")
          setTimeout(() => router.push("/login"), 1000)
        }).catch((error) => setMsg("Error Has occured: " + error))
      }
    } else {
      setMsg("Passwords do not match!")
    }
  };
  
  return (
    <div className={styles.main_body}>
     <div className={styles.login_box}>
        <div>
          <Image
            src={finemalogo}
            width={200}
            height={200}
            alt="finema logo"
            />
        </div>
        <form className={styles.form} onSubmit={handleReset}>
          <section>
            <h2 className={styles.headers}> Enter new Password </h2>
            <input value={password1} onChange={(e) => setPassword1(e.target.value)} className={styles.text_fields} required />
          </section>
          <section>
            <h2 className={styles.headers}> Enter new Password again </h2>
            <input value={password2} type="password" onChange={(e) => setPassword2(e.target.value)} className={styles.text_fields} required />
          </section>
          <div className={styles.login_button}>
            <Button type='submit'>Reset Password</Button>
          </div>
          {msg && <p>{msg}</p>}
        </form>
      </div>
    </div>
  );
};

