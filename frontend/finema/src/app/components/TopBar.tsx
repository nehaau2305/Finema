import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useToken } from '../components/useToken';
import Button from './Button';
import styles from './TopBar.module.css';
import Image from 'next/image';
import finemalogo from './finemalogo.png';

interface Theater {
  id: number;
  name: string;
}

const TopBar = ({ loggedIn = false, showEditProfile = true }: any) => {
  const router = useRouter();
  const [token, setToken] = useToken('token');
  // const [storedTheater, setStoredTheater] = useToken('selectedTheater');
  // const [theaters, setTheaters] = useState<Theater[]>([]);
  // const [selectedTheater, setSelectedTheater] = useState<number | null>(parseInt(storedTheater));

  //commenting this out cuz i think we only need one theater

  /*

  // Fetch theaters from the backend
  useEffect(() => {
    const fetchTheaters = async () => {
      try {
        const response = await fetch('http://localhost:8080/theaters/all', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch theaters');
        }

        const data: Theater[] = await response.json();
        setTheaters(data);
      } catch (error) {
        console.error('Error fetching theaters:', error);
      }
    };

    fetchTheaters();
  }, []);

  // Handle theater selection

  const handleTheaterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const theaterId = parseInt(event.target.value);
    setSelectedTheater(theaterId);
    setStoredTheater(theaterId.toString()) // Save the selected theater to localStorage
  };

  */

  async function goToWebUserHome() {
    fetch(`http://localhost:8080/users/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    })
      .then(() => {
        setToken('');
        router.push('/web-user-home');
      })
      .catch((error) => console.error('Error logging out:', error));
  }

  function goToLoggedInHome() {
    router.push('/loggedin-user-home');
  }

  function goToLogin() {
    router.push('/login');
  }

  function goToSignUp() {
    router.push('/registration');
  }

  function goToEditProfile() {
    router.push('/edit-profile');
  }

  const loggedInUser = (
    <div className={styles.webUserTopBar}>
      <button onClick={goToLoggedInHome}>
        <Image
          src={finemalogo}
          height={200}
          width={200}
          alt="finemalogo home button"
        />
      </button>

      {/*
      <div className={styles.dropdown}>
         
        <select onChange={handleTheaterChange} value={selectedTheater || ''}>
          <option value="" disabled>
            Select a Theater
          </option> 
          {theaters.map((theater) => (
            <option key={theater.id} value={theater.id}>
              {theater.name}
            </option>
          ))}
        </select>
      </div>
      */}

      <div className={styles.buttons}>
        <div>
          {showEditProfile ? (
            <Button onClick={goToEditProfile}>Edit Profile</Button>
          ) : (
            <></>
          )}
        </div>
        <div>
          <Button onClick={goToWebUserHome}>Log Out</Button>
        </div>
      </div>
    </div>
  );

  const webUser = (
    <div className={styles.webUserTopBar}>
      <button onClick={goToWebUserHome}>
        <Image
          src={finemalogo}
          height={200}
          width={200}
          alt="finemalogo home button"
        />
      </button>

      {/*
      <div className={styles.dropdown}>
        <select onChange={handleTheaterChange} value={selectedTheater || ''}>
          <option value="" disabled>
            Select a Theater
          </option>
          {theaters.map((theater) => (
            <option key={theater.id} value={theater.id}>
              {theater.name}
            </option>
          ))}
        </select>
      </div>
      */}
      
      <div className={styles.buttons}>
        <div>
          <Button onClick={goToLogin}>Log In</Button>
        </div>
        <div>
          <Button onClick={goToSignUp}>Sign Up</Button>
        </div>
      </div>
    </div>
  );

  const currentUser = loggedIn ? loggedInUser : webUser;

  return currentUser;
};

export default TopBar;