'use client'
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'
import Button from '../components/Button'
import { useToken } from '../components/useToken'
import styles from './Login.module.css'
import Image from 'next/image'
import LoginPopup from '../components/LoginPopup';
import finemalogo from './finemalogo.png'
import { jwtDecode } from "jwt-decode";

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
        console.log("Network response is ok");
        console.log(response);
      }
      
      const data = await response.text();
      console.log('Login Confirmed:', data);
      return data;
}


export default function Login() {
  const [msg, setMsg] = useState("");
  const [token, setToken] = useToken('token');
  const [username, setUsername] = useToken('username');
  const [checked, setChecked] = useState(username !== "");
  const router = useRouter()
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState(username);
  const [isOpened, setIsOpened] = useState(false);

  useEffect(() => {
    if (checked) {
      setUsername(email)
    }
  }, [email]
  );

  const handleRemember = () => {
    console.log(checked);
    setChecked(!checked);
    if (checked) {
      console.log("The value is" + checked);
      setUsername("");
    } else if (!checked) {
      setUsername(email)
    }
  };
  const handleSignUp = () => {
    router.push('/registration')
  }
  const handleLogIn = async (e:any) => {
    e.preventDefault()
    loginUser({email, password}).then((result) => {
      setToken(result);
      localStorage.setItem("token", result);
      //setTimeout(() => router.push('/loggedin-user-home'), 1000)
      const decodedToken: any = jwtDecode(result);
      console.log("Decoded Token:", decodedToken);
      const emailFromToken = decodedToken.sub;
      console.log("Extracted Email:", emailFromToken);
      fetchUserDetailsByEmail(emailFromToken, result);
      setMsg("Login Success!")
    }).catch((error) => {
      setMsg("Error logging in, check password or email")
      console.error("Error logging in:", error);
    })
  }

const fetchUserDetailsByEmail = async (email: string, token: string) => {
  try {
    const response = await fetch(`http://localhost:8080/users/details?email=${email}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,  // Pass token in the Authorization header
      },
    });

    if (response.ok) {
      const userDetails = await response.json();
      console.log("User Details:", userDetails);
      console.log("Admin?", userDetails.isAdmin);
      if (userDetails.isAdmin == true) {
        console.log("Redirecting to admin-home");
        setTimeout(() => router.push('/admin-home'), 1000);
      } else {
        console.log("Redirecting to loggedin-user-home");
        setTimeout(() => router.push('/loggedin-user-home'), 1000);
      }
    } else {
      console.error("Error fetching user details");
    }
  } catch (error) {
    console.error("Error fetching user details:", error);
  }
};
  

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
      <h2 className={styles.headers}> Remember Me? </h2>
      <input type="checkbox" checked={checked} onChange={handleRemember}></input>
      <h1 className={styles.headers}> dont have an account yet? sign up! </h1>
      <Button onClick={handleSignUp}>sign up</Button>
      {msg && <p>{msg}</p>}
      <Button onClick={handleAdminLogIn}>admin log in</Button>
      <h1 className={styles.headers}> Forgot password? </h1>
      <Button onClick={()=>setIsOpened(true)}> Reset Password </Button>
      <LoginPopup
        isOpened={isOpened}
        onClose={() => setIsOpened(false)}
      />


      </div>
    </div>
  );
};

