'use client';
import React, { useState, useEffect } from 'react';
import styles from './ManageUserPopup.module.css';
import Button from '../components/Button';

interface Props {
  email: string;
  onClose: () => void;
}

interface Card { 
    cardID: number;
    cardNumber: string;
    cardholderName: string;
    expirationDate: string;
    cvv: string;
    billingAddress: string;
 }

export default function ManageUserPopup({ email, onClose }: Props) {
  const [userData, setUserData] = useState({ 
    name: '',
    phone: '',
    email: '',
    home_address: '' 
    });

  const [cards, setCards] = useState<Card[]>([]);

  useEffect(() => {

    console.log('users email', email)

    fetch(`http://localhost:8080/users/${email}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(response => response.json())
      .then(data => {
        setUserData(data);
      })
      .catch(error => console.error('Error fetching user data:', error));

    fetch(`http://localhost:8080/users/cards/${email}`)
      .then(response => response.ok ? response.json() : [])
      .then(setCards)
      .catch(() => setCards([]))
  }, [email]);

  const updateUser = () => {
    console.log(userData)
    fetch(`http://localhost:8080/users/${email}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...userData }),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to update user');
        }
        return response.json();
      })
      .then(data => {
        console.log('Updated user:', data);
        alert('User updated.');
      })
      .catch(error => {
        console.error('Error updating user:', error);
        alert('Failed to update user.');
      });
  };
  

  return (
    <div className={styles.background}>
        <div className={styles.popup}>
        <h2>Edit User</h2>
        <h2>{userData.email}</h2>
        <h2>Name</h2>
        <input name="name" value={userData.name} onChange={e => setUserData({ ...userData, name: e.target.value })} />
        <h2>Phone</h2>
        <input name="phone" value={userData.phone} onChange={e => setUserData({ ...userData, phone: e.target.value })} />
        <h2>Home Address</h2>
        <input name="homeAddress" value={userData.home_address} onChange={e => setUserData({ ...userData, home_address: e.target.value })} />
        <div>
            <Button onClick={updateUser}>Save</Button>
            <Button onClick={onClose}>Close</Button>
        </div>
        </div>
    </div>
  );
}
