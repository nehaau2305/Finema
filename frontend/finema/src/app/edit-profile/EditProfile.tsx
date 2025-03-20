'use client'
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'
import { useToken } from '../components/useToken'
import styles from './EditProfile.module.css'
import TopBar from '../components/TopBar';
import Button from '../components/Button';

export default function EditProfile() {
  const router = useRouter();
<<<<<<< Updated upstream
  const [token, setToken] = useToken('token');
=======
  const [token, setToken] = useToken();
  const [password, setPassword] = useState('');
>>>>>>> Stashed changes
  const [userData, setUserData] = useState({
    name: '',
    phone: '',
    email: '',
    homeAddress: '',
    cardNumber: '',
    expirationDate: '',
    billingAddress: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    promotions: false,
  });

  useEffect(() => {
    if (token === '') {
      router.push('/web-user-home');
    } else {
      // Fetch user data from the backend
      fetch('http://localhost:8080/users/profile', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(token)
      })
      .then(response => response.json())
      .then(data => setUserData(data))
      .catch(error => console.error('Error fetching user data:', error));
    }
  }, [token, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleRadioChange = (value: boolean) => {
    setUserData(prevState => ({
      ...prevState,
      promotions: value
    }));
  };

  const handleSubmit = () => {
    // Validate form data
    if (userData.newPassword !== userData.confirmPassword) {
      alert('New password and confirm password do not match');
      return;
    }

    // Submit updated user data to the backend

    console.log('Updating user: ', userData.email)
    fetch('http://localhost:8080/users/' + userData.email, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(userData)
    })
    .then(response => {
      if (response.ok) {
        alert('Profile updated successfully');
      } else {
        alert('Error updating profile');
      }
    })
    .catch(error => console.error('Error updating profile:', error));
  };

  return (
    <div>
      <div className={styles.top}>
        <TopBar loggedIn={true} showEditProfile={false} />
      </div>
      <section className={styles.main_body}>
        <section className={styles.personal_promotion}>
          <section className={styles.personal}>
            <div className={styles.input_section}>
              <h1>Name</h1>
              <input name="name" value={userData.name} onChange={handleChange} />
            </div>
            <div className={styles.input_section}>
              <h1>Phone Number</h1>
              <input name="phone" value={userData.phone} onChange={handleChange} />
            </div>
            <div className={styles.address_field}>
              <h1>Home Address</h1>
              <input name="homeAddress" value={userData.homeAddress} onChange={handleChange} />
            </div>
            <Button onClick={handleSubmit}>Update Information</Button>
          </section>
          <section className={styles.promotion}>
            <div>
              <h2>Subscribe for email Promotions</h2>
              <input
                type="radio"
                value="true"
                checked={userData.promotions === true}
                onChange={() => handleRadioChange(true)}
              />
            </div>
            <div>
              <h2>Unsubscribe from email Promotions</h2>
              <input
                type="radio"
                value="false"
                checked={userData.promotions === false}
                onChange={() => handleRadioChange(false)}
              />
            </div>
          </section>
        </section>
        <section className={styles.password_card}>
          <section className={styles.password}>
            <h2>Change Password</h2>
            <div className={styles.input_section}>
              <h1>Current Password</h1>
              <input name="currentPassword" type="password" value={userData.currentPassword} onChange={handleChange} />
            </div>
            <div className={styles.input_section}>
              <h1>New Password</h1>
              <input value={userData.newPassword} type="password" onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div className={styles.input_section}>
              <h1>Confirm New Password</h1>
              <input value={userData.newPassword} type="password" onChange={(e) => setPassword(e.target.value)} />
            </div>
            <Button onClick={handleSubmit}>Change Password</Button>
          </section>
          <section className={styles.card}>
            <h2>Payment Information</h2>
            <div className={styles.input_section}>
              <h1>Card Number</h1>
              <input name="cardNumber" value={userData.cardNumber} onChange={handleChange} />
            </div>
            <div className={styles.input_section}>
              <h1>Expiration Date</h1>
              <input name="expirationDate" value={userData.expirationDate} onChange={handleChange} />
            </div>
            <div className={styles.address_field}>
              <h1>Billing Address</h1>
              <input name="billingAddress" value={userData.billingAddress} onChange={handleChange} />
            </div>
            <Button onClick={handleSubmit}>Add Card</Button>
          </section>
        </section>
      </section>
    </div>
  );
}