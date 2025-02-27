'use client'
import React from 'react';
import Button from '../components/Button';
import styles from './TicketStub.module.css'
import { useRouter } from 'next/navigation'

export default function OrderSummary({ticket_type, seat} : {ticket_type:String, seat:String}) {
  const router = useRouter();

  function goSeat() {
    router.push('/seat-selection')
  }
  function goType() {
    router.push('/show-time')
  }
  function deleteTicket() {
    console.log('ERRRRR, not implemented')
  }


  return (
    <section className={styles.main_body}>
      <h1> Type: {ticket_type} </h1> 
      <h1> Seat: {seat} </h1>
      <div className={styles.button}>
        <Button onClick={goType}> Edit Type </Button>
      </div>
      <div className={styles.button}>
        <Button onClick={goSeat}> Edit Seat </Button>
      </div>
      <div className={styles.button}>
        <Button onClick={deleteTicket}> Delete </Button>
      </div>
    </section>
  );
};
