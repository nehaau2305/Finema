'use client'
import React, { useState } from 'react';
import { useRouter } from 'next/navigation'
import Button from '../components/Button'
import { useToken } from '../components/useToken'
import styles from './Login.module.css'
import Image from 'next/image'
import finemalogo from './finemalogo.png'

async function loginUser({email, password}:{email:String, password:String}) {
  const loginInfo = {email, password}
      const response = await fetch(`http://localhost:8080/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginInfo),
      })

      if (!response.ok) {
        console.log(response);
        throw new Error('Network response was not ok');
      } else {
        console.log("response is ok");
        console.log(response);
      }
      
      const data = await response.text();
      console.log('Login Confirmed:', data);
      return data;
}

export default function Login() {
  const [msg, setMsg] = useState("");
  const [token, setToken] = useToken();
  //const [token, setToken] = useState<string | null>(localStorage.getItem("token"));
  const router = useRouter()
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  
  const handleSignUp = () => {
    router.push('/registration')
  }
  const handleLogIn = async (e:any) => {
    e.preventDefault()
    loginUser({email, password}).then((result) => {
      setToken(result);
      //localStorage.setItem("token", result);
      setTimeout(() => router.push('/loggedin-user-home'), 1000)
      setMsg("Login Success!")
    }).catch((error) => {
      setMsg("Error logging in, check password or email")
      console.error("Error logging in:", error);
    })
  }

  const handleAdminLogIn = () => {
    router.push('/admin-home')
  }
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
          <form onSubmit={handleLogIn}>
            <section>
              <h2 className={styles.headers}>email </h2>
              <input value={email} onChange={(e) => setEmail(e.target.value)} className={styles.text_fields} required />
            </section>

            <section>
              <h2 className={styles.headers}>password </h2>
              <input value={password} onChange={(e) => setPassword(e.target.value)} className={styles.text_fields} required />
            </section>

            <Button type='submit'>Log-In</Button>
          </form>
      <h1 className={styles.headers}> dont have an account yet? sign up! </h1>
      <Button onClick={handleSignUp}>sign up</Button>
      {msg && <p>{msg}</p>}
      <Button onClick={handleAdminLogIn}>admin log in</Button>


      </div>
    </div>
  );
};

