'use client'
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useToken } from '../components/useToken';
import styles from './ManagePromotions.module.css';
import TopBar from '../components/TopBar';
import Button from '../components/Button';

export default function ManagePromotions() {
  const router = useRouter();
  const [token, setToken] = useToken('token');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [code, setCode] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [discount, setDiscount] = useState('');

  if (token === '') {
    router.push('/web-user-home');
  }

  const handleAddPromotion = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/promotions', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: name,
          description: description,
          code: code,
          startDate: startDate,
          endDate: endDate,
          discount: discount
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to add promotion');
      }

      alert('Promotion added successfully!');
      setName('');
      setDescription('');
      setCode('');
      setStartDate('');
      setEndDate('');
    } catch (error) {
      console.error('Error adding promotion:', error);
      alert('Failed to add promotion. Please try again.');
    }
  };

  return (
    <div>
      <div className={styles.top}>
        <TopBar loggedIn={true} showEditProfile={false} />
      </div>
      <section className={styles.main_body}>
        <section className={styles.promotion_info}>
          <div className={styles.input_section}>
            <h1>Promotion Name</h1>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter promotion name"
            />
            <h1>Description</h1>
            <textarea
              className={styles.textarea} // Apply the .textarea class from your CSS file
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter promotion description"
              rows={4}
            />
            <h1>Code</h1>
            <input
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Enter promotion code"
            />
            <h1>Discount(Percent off)</h1>
            <input
              value={discount}
              onChange={(e) => {
                const temp = e.target.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');
                if (parseFloat(temp) <= 1 || temp === '' || temp === '.') {
                  setDiscount(temp)
                }
                // setDiscount(e.target.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1'))
              }}
              placeholder="Enter promotion code"
            />
            <h1>Start Date</h1>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              placeholder="Select start date"
            />
            <h1>End Date</h1>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              placeholder="Select end date"
            />
          </div>
          <Button onClick={handleAddPromotion}>Add Promotion</Button>
        </section>
      </section>
    </div>
  );
}