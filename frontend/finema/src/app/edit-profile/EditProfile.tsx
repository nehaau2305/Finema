'use client'
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'
import { useToken } from '../components/useToken'
import styles from './EditProfile.module.css'
import TopBar from '../components/TopBar';
import Button from '../components/Button';
import PayCard from '../components/PayCard';

interface Card {
  id: number;
  cardNumber: string;
  expDate: string;
  billingAddress: string;
}

export default function EditProfile() {
  const router = useRouter();
  const [token, setToken] = useToken('token');

  const [userData, setUserData] = useState({
    name: '',
    phone: '',
    email: '',
    homeAddress: '',
    cardNumber: '',
    expirationDate: '',
    cvv: '',
    billingAddress: '',
    promotions: false,
  });
  const [passwords, setPasswords] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [results, setResults] = useState<Card[]>([]);

  useEffect(() => {
    fetch(``, { // add fetch for cards
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(token)
    })
    .then(response => response.json())
    .then(data => setResults(data))
    .catch(error => console.error('Error fetching user data:', error));
    const mine:Card = {
      id: 1,
      cardNumber: '1234345',
      expDate: '02/32',
      billingAddress: 'here'
    }
    const hers:Card = {
      id: 2,
      cardNumber: '1234654',
      expDate: '02/32',
      billingAddress: 'here'
    }
    const his:Card = {
      id: 3,
      cardNumber: '12343456',
      expDate: '02/32',
      billingAddress: 'here'
    }
    const theirs:Card = {
      id: 4,
      cardNumber: '1234987',
      expDate: '02/32',
      billingAddress: 'here'
    }
    setResults([mine, hers, his, theirs])
    // Remove above once working
  }, [router]);

  const deleteCard = (card:Card) => {
    const cardAndToken = {card, token}
    fetch(``, { // add delete path for card
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(cardAndToken)
    })
    .then(response => response.json()) // Assuming results will be a new list of cards
    .then(data => setResults(data))
    .catch(error => console.error('Error fetching user data:', error));
  };

  const addCard = (card:Card) => {
    const cardAndToken = {card, token}
    fetch(``, { // add add path for card
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(cardAndToken)
    })
    .then(response => response.json())
    .then(data => setResults(data))
    .catch(error => console.error('Error fetching user data:', error));
  };

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
  }, [router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswords(prevState => ({
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
    if (passwords.newPassword !== passwords.confirmPassword) {
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

  const handlePasswordSubmit = () => {
    // Validate form data
    if (passwords.newPassword !== passwords.confirmPassword) {
      alert('New password and confirm password do not match');
      return;
    }

    // Submit updated user data to the backend

    console.log('Updating password for: ', userData.email)
    fetch('http://localhost:8080/auth/newpassword', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({password:passwords.newPassword, token:token})
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
              <input name="currentPassword" type="password" value={passwords.currentPassword} onChange={handlePasswordChange} />
            </div>
            <div className={styles.input_section}>
              <h1>New Password</h1>
              <input name="newPassword" value={passwords.newPassword} type="password" onChange={handlePasswordChange} />
            </div>
            <div className={styles.input_section}>
              <h1>Confirm New Password</h1>
              <input name="confirmPassword" value={passwords.confirmPassword} type="password" onChange={handlePasswordChange} />
            </div>
            <Button onClick={handlePasswordSubmit}>Change Password</Button>
          </section>
          <div className={styles.card_zone}>
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
              <div className={styles.input_section}>
                <h1> CVV </h1>
                <input name="cvv" value={userData.cvv} onChange={handleChange} />
              </div>
              <div className={styles.address_field}>
                <h1>Billing Address</h1>
                <input name="billingAddress" value={userData.billingAddress} onChange={handleChange} />
              </div>
              <Button onClick={handleSubmit}>Add Card</Button>
            </section>
            <section className={styles.card_list}>
              <h1 className={styles.headers}> Your Saved Cards: </h1>
              <ul>
                {results.length > 0 ? (
                  results.map((card: Card) => (
                    <li key={card.id}>
                      <PayCard
                        cardNum={card.cardNumber}
                        expDate={card.expDate}
                        deleteCard={() => deleteCard(card)}
                      />
                    </li>
                  ))
                ) : (
                  <p>No results found</p>
                )}
              </ul>
            </section>
          </div>
        </section>
      </section>
    </div>
  );
}