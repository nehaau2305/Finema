import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useToken } from '../components/useToken';
import Button from './Button';
import styles from './TopBar.module.css';
import Image from 'next/image';
import finemalogo from './finemalogo.png';

const TopBar = ({ loggedIn = false, showEditProfile = true, isAdmin = false, showOrderHistory = true}: any) => {
  const router = useRouter();
  const [token, setToken] = useToken('token');

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

  function goToAdminPage() {
    router.push('/admin-home');
  }

  function goToOrderHistory() {
    router.push('/order-history');
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

      <div className={styles.buttons}>
      <div>
          {isAdmin ? (
            <Button onClick={goToAdminPage}>Admin</Button>
          ) : (
            <></>
          )}
        </div>
        <div>
          {showEditProfile ? (
            <Button onClick={goToEditProfile}>Edit Profile</Button>
          ) : (
            <></>
          )}
        </div>
        <div>
          {showOrderHistory ? (
            <Button onClick={goToOrderHistory}>Order History</Button>
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