import React, { useState, useEffect } from 'react';
import styles from './PayCard.module.css';
import Button from '../components/Button';

interface PayCardProps {
  cardNum: string;
  cardholderName: string;
  expDate: string;
  cvv: string;
  billingAddress: string;
  deleteCard: () => void;
}

export default function PayCard({ cardNum, cardholderName, expDate, cvv, billingAddress, deleteCard }: PayCardProps) {
  const [last4, setLast4] = useState('');

  useEffect(() => {
    setLast4(cardNum.slice(cardNum.length - 4));
  }, [cardNum]);

  return (
    <div className={styles.main_body}>
      <div className={styles.headers}>
        <h1 className={styles.header}>Card Number: **** **** **** {last4}</h1>
        <h1 className={styles.header}>Cardholder Name: {cardholderName}</h1>
        <h1 className={styles.header}>Expiration Date: {expDate}</h1>
        <h1 className={styles.header}>CVV: {cvv}</h1>
        <h1 className={styles.header}>Billing Address: {billingAddress}</h1>
      </div>
      <div className={styles.button}>
        <Button onClick={deleteCard}>Delete</Button>
      </div>
    </div>
  );
}