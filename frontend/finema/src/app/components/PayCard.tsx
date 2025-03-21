import React, { useState, useEffect } from 'react';
import styles from './PayCard.module.css'
import Button from '../components/Button';

export default function PayCard({cardNum, expDate, deleteCard}:{cardNum:string, expDate:string, deleteCard:() => void}) {
    const [last4, setLast4] = useState('')

    useEffect(() => {
        setLast4(cardNum.slice(cardNum.length - 5, cardNum.length - 1))
    });

    return (
        <div className={styles.main_body}>
            <div className={styles.headers}>
                <h1 className={styles.header}> {last4} </h1>
                <h1 className={styles.header}> {expDate} </h1>
            </div>
            <div className={styles.button}>
                <Button onClick={deleteCard}> Delete </Button>
            </div>
        </div>
    )
}
