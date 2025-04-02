'use client'
import React from 'react';
import Button from '../components/Button';
import styles from './TicketStub.module.css'
import { useRouter } from 'next/navigation'

interface Ticket {
  id: number,
  seatID:number,
  seatNum:number,
  type:string
}

export default function OrderSummary({ticket} : {ticket:Ticket}) {
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
      <h1> Type: {ticket.type} </h1> 
      <h1> Seat: {ticket.seatNum} </h1>
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
