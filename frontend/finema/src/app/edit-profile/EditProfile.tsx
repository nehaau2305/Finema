'use client'
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useToken } from '../components/useToken';
import styles from './EditProfile.module.css';
import TopBar from '../components/TopBar';
import Button from '../components/Button';
import PayCard from '../components/PayCard';

interface Card {
  cardID: number;
  cardNumber: string;
  cardholderName: string;
  expirationDate: string;
  cvv: string;
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
  });
  const [promotions, setPromotions] = useState(false);
  const [passwords, setPasswords] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [cards, setCards] = useState<Card[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (token === '') {
      router.push('/web-user-home');
    } else {

      fetch('http://localhost:8080/users/profile', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })
      .then(response => response.json())
      .then(data => {
        setUserData(data);
        setPromotions(data.promotions);
      })
      .catch(error => console.error('Error fetching user data:', error));

      fetch('http://localhost:8080/users/cards', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })
      .then(response => {
        console.log('this is full response: ', response)
        if (!response.ok) {
          throw new Error('Failed to fetch cards')
        }
        if (response.status === 204) {
          return []
        }
        return response.json()
      })
      .then(data => {
        console.log('fetched card data', data)
        setCards(data)
        setIsLoading(false)
     })
      .catch(error => {
        console.error('Error fetching cards:', error)
        setIsLoading(false)
      })
    }
  }, [router, token]);

  const deleteCard = (cardID: number) => {
    console.log(cardID)
    fetch('http://localhost:8080/users/deleteCard', {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(cardID)
    })
    .then(response => response.json())
    .then(data => setCards(data))
    .catch(error => console.error('Error deleting card:', error));
  };

  const addCard = (card: any) => {

    if (cards.length >= 4) {
      console.log("You can only add up to 4 cards.")
      return
    }
    
    //const newCard = { ...card};
    fetch('http://localhost:8080/users/addCard', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(card)
    })
    .then(response => {
      if (!response.ok) {
        console.log(response);
        return response.text().then(text => { throw new Error(text) });
      }
      return response.json();
    })
    .then(data => {
      setCards(data);
      // Reset card fields
      setCardData({
        cardNumber: '',
        cardholderName: '',
        expirationDate: '',
        cvv: '',
        billingAddress: ''
      });
    })
    .catch(error => console.error('Error adding card:', error));
  };

  const [cardData, setCardData] = useState({
    cardNumber: '',
    cardholderName: '',
    expirationDate: '',
    cvv: '',
    billingAddress: ''
  });

  const handleCardChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCardData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

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
    setPromotions(value);
  };

  const handleSubmit = () => {

    const sendUserData = {...userData, promotions:promotions}

    // Submit updated user data to the backend
    fetch('http://localhost:8080/users/' + userData.email, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(sendUserData)
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
    console.log('Updating password for: ', userData.email);
    fetch('http://localhost:8080/auth/newpassword', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ newPassword: passwords.newPassword, currentPassword: passwords.currentPassword, email: userData.email})
    })
    .then(response => {
      if (response.ok) {
        alert('Password updated successfully');
      } else {
        console.log('error with password reset: ', response)
        alert('Error updating password');
      }
    })
    .catch(error => console.error('Error updating password:', error));
  };

  const handlePromotionSubmit = () => {
    fetch(`http://localhost:8080/users/${userData.email}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ ...userData, promotions })
    })
    .then(response => {
      if (response.ok) {
        alert('Promotion preference updated successfully');
      } else {
        alert('Error updating promotion preference');
      }
    })
    .catch(error => console.error('Error updating promotion preference:', error));
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
              <input name="name" value={userData.name || ''} onChange={handleChange} />
            </div>
            <div className={styles.input_section}>
              <h1>Email</h1>
              <input name="email" value={userData.email || ''} readOnly />
            </div>
            <div className={styles.input_section}>
              <h1>Phone Number</h1>
              <input name="phone" value={userData.phone || ''} onChange={handleChange} />
            </div>
            <div className={styles.address_field}>
              <h1>Home Address</h1>
              <input name="homeAddress" value={userData.homeAddress || ''} onChange={handleChange} />
            </div>
            <Button onClick={handleSubmit}>Update Information</Button>
          </section>
          <section className={styles.promotion}>
            <div>
              <h2>Subscribe for email Promotions</h2>
              <input
                type="radio"
                checked={promotions === true}
                onChange={() => handleRadioChange(true)}
              />
            </div>
            <div>
              <h2>Unsubscribe from email Promotions</h2>
              <input
                type="radio"
                checked={promotions === false}
                onChange={() => handleRadioChange(false)}
              />
            </div>
            <Button onClick={handlePromotionSubmit}>Update Information</Button>
          </section>
        </section>
        <section className={styles.password_card}>
          <section className={styles.password}>
            <h2>Change Password</h2>
            <div className={styles.input_section}>
              <h1>Current Password</h1>
              <input name="currentPassword" type="password" value={passwords.currentPassword || ''} onChange={handlePasswordChange} />
            </div>
            <div className={styles.input_section}>
              <h1>New Password</h1>
              <input name="newPassword" value={passwords.newPassword || ''} type="password" onChange={handlePasswordChange} />
            </div>
            <div className={styles.input_section}>
              <h1>Confirm New Password</h1>
              <input name="confirmPassword" value={passwords.confirmPassword || ''} type="password" onChange={handlePasswordChange} />
            </div>
            <Button onClick={handlePasswordSubmit}>Change Password</Button>
          </section>
          <div className={styles.card_zone}>
            <section className={styles.card}>
              <h2>Payment Information</h2>
              <div className={styles.input_section}>
                <h1>Cardholder Name</h1>
                <input name="cardholderName" value={cardData.cardholderName || ''} onChange={handleCardChange} />
              </div>
              <div className={styles.input_section}>
                <h1>Card Number</h1>
                <input name="cardNumber" value={cardData.cardNumber || ''} onChange={handleCardChange} />
              </div>
              <div className={styles.input_section}>
                <h1>Expiration Date</h1>
                <input name="expirationDate" value={cardData.expirationDate || ''} onChange={handleCardChange} />
              </div>
              <div className={styles.input_section}>
                <h1> CVV </h1>
                <input name="cvv" value={cardData.cvv || ''} onChange={handleCardChange} />
              </div>
              <div className={styles.address_field}>
                <h1>Billing Address</h1>
                <input name="billingAddress" value={cardData.billingAddress || ''} onChange={handleCardChange} />
              </div>
              <Button onClick={() => addCard(cardData)}>Add Card</Button>
            </section>
            <section className={styles.card_list}>
              <h1 className={styles.headers}> Your Saved Cards: </h1>
              <h4 className={styles.headers_small}> Number:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Expiration Date: </h4>
              {isLoading ? (
                <p>Loading cards...</p>
              ) : (
              <ul>
                {cards.length > 0 ? (
                  cards.map((card: Card) => (
                    <li key={card.cardID}>
                      <PayCard
                        cardNum={card.cardNumber}
                        cardholderName={card.cardholderName}
                        expDate={card.expirationDate}
                        cvv={card.cvv}
                        billingAddress={card.billingAddress}
                        deleteCard={() => deleteCard(card.cardID)}
                      />
                    </li>
                  ))
                ) : (
                  <p>No results found</p>
                )}
              </ul>
              )}
            </section>
          </div>
        </section>
      </section>
    </div>
  );
}