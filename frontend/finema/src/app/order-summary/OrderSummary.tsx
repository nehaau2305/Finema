'use client'
import React from 'react';
import Button from '../components/Button';
import styles from './OrderSummary.module.css'
import { useRouter } from 'next/navigation'
import TicketStub from '../components/TicketStub'

export default function OrderSummary() {
  const router = useRouter();

  function goBack() {
    router.push('/seat-selection')
  }
  function goHome() {
    router.push('/web-user-home')
  }
  function goConfirmation() {
    router.push('/order-confirmation')
  }
  function foo() {
    console.log('PHEW!')
  }
  const total = "20.00"
  const movieTitle = "Time Bandits"
  const showTime = "2/10/25 - 12:00pm"


  return (
    <section className={styles.main_body}>
            <section className={styles.order_buttons}>
                <section className={styles.summary}>
                  <h1> Order Summary </h1>
                  <ul>
                    <li> Movie Name: {movieTitle} </li>
                    <li> Showtime: {showTime} </li>
                  </ul>
                </section>
                <section className={styles.ticket_area}>
                  <h1> Tickets: </h1>
                  <ul> {/** TODO: Add Scrolling */}
                    <li className={styles.list}>
                      <ul> <TicketStub ticket_type={'adult'} seat={'3A'} /> </ul>
                      <ul> <TicketStub ticket_type={'adult'} seat={'3B'} /> </ul>
                    </li>
                  </ul>
                </section>
                <section className={styles.button_area}>
                  <div className={styles.button}>
                    <Button onClick={goBack}> Go Back </Button>
                  </div>
                  <div className={styles.button}>
                    <Button onClick={goHome}> Cancel </Button>
                  </div>
                </section>
            </section>
            <section className={styles.checkout}>
              <div className={styles.saved_card}>
                <h2> Order Total: {total} </h2>
                <div className={styles.button}>
                  <Button onClick={foo}> Use Saved Card </Button>
                </div>
              </div>
              <section className={styles.payment}>
                  <h2> Payment Information </h2>
                  <dl>
                    <dt>Card Number</dt>
                    <dd>
                      <input className={styles.text_fields}></input>
                    </dd>
                    <dt>Expiration Date</dt>
                    <dd>
                      <input className={styles.text_fields}></input>
                    </dd>
                    <dt>Billing Address</dt>
                    <dd>
                        <section className={styles.billing}>
                          <input className={styles.text_fields}></input >
                          <input className={styles.text_fields}></input>
                          <input className={styles.text_fields}></input>
                        </section>
                    </dd>
                  </dl>
                  <div className={styles.button}>
                    <Button onClick={goConfirmation}> Place Order </Button>
                  </div>
                </section>
            </section>
        </section>
  );
};
