'use client'
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'
import { useToken } from '../components/useToken'
import styles from './ManagePromotions.module.css'
import TopBar from '../components/TopBar';
import Button from '../components/Button';

interface Promotion {
  promotionId: number,
  promotionText: string
}

export default function ManagePromotions() {
  const router = useRouter()
  const [token, setToken] = useToken('token');
  const [promotionText, setPromotionText] = useState('');

  const [promotions, setPromotions] = useState<Promotion[]>([]);

  //if (token === '') {
  //  router.push('/web-user-home')
 // }

 useEffect(() => {
  if (token === '') {
    router.push('/web-user-home');
  } else {
    fetch('http://localhost:8080/promotion', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      console.log('this is full response: ', response)
      if (!response.ok) {
        throw new Error('Failed to fetch promotions')
      }
      return response.json()
    })
    .then(data => {
      console.log('fetched promotion data', data)
      setPromotions(data)
   })
    .catch(error => {
      console.error('Error fetching promotions:', error)
    })
  }
}, [router, token]);

const addPromotion = (promotionText: string) => {
  const promotion = {promotionText}

  fetch('http://localhost:8080/promotion/add', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(promotion)
  })
  .then(response => {
    if (!response.ok) {
      console.log(response);
      return response.text().then(text => { throw new Error(text) });
    }
    return response.json();
  })
  .then(data => {
    setPromotions(prev => [...prev, data]);
    setPromotionText('')
  })
  .catch(error => console.error('Error adding promotion:', error));
};
  
  return (
    <div>
    <div className={styles.top}>
      <TopBar loggedIn={true} showEditProfile={false}/>
    </div>
    <section className={styles.main_body}>
        <section className={styles.promotion_info}>
          <div className={styles.input_section}>
            <h1> promotion message </h1>
            <input value={promotionText} onChange={(e) => setPromotionText(e.target.value)} />
            
            {/* </div>
            <h1> ticket type </h1>
            <select name="ticket type" id="tickettype">
              <option value="child">child</option>
              <option value="adult">adult</option>
              <option value="senior">senior</option>
            </select>
            <h1> discount </h1>
            <input></input>
            <h1> movie </h1>
            <input></input>
            <h1> date effective </h1>
            <input type="date" id="date" name="date"></input>
            </section>
            </section>
            */}


          </div>

          <Button onClick={() => addPromotion(promotionText)}> Add Promotion </Button>
          </section>
          <section className={styles.current_promotions}>
          <h1> Current promotions: </h1>
          <section className={styles.promotions_list}>
          <ul>
                {promotions.length > 0 ? (
                  promotions.map((promotion: Promotion) => (
                    <li key={promotion.promotionId}>
                      <div>{promotion.promotionId}</div>
                      <h2>{promotion.promotionText}</h2>
                    </li>
                  ))
                ) : (
                  <p>No results found</p>
                )}
              </ul>
              </section>
              </section>
        </section>
  </div>

  );
};