'use client'
import React, { useState, useEffect, useRef } from 'react';
import Button from '../components/Button';
import styles from './OrderSummary.module.css'
import { useRouter } from 'next/navigation'
import { useToken } from '../components/useToken'
import TicketStub from '../components/TicketStub'
import PayCard from '../components/PayCard';

interface Card {
  cardID: number;
  cardNumber: string;
  cardholderName: string;
  expirationDate: string;
  cvv: string;
  billingAddress: string;
}

interface Ticket {
  id: number,
  seatID:number,
  seatNum:number,
  type:string
}

export default function OrderSummary() {
  const router = useRouter();
  const [token, setToken] = useToken('token');
  if (token === '') {
    router.push('/login') // Will have to figure out how to save their order during their login
  }

  function goBack() {
    router.push('/seat-selection')
  }
  function goHome() {
    router.push('/web-user-home')
  }
  function foo() {
    console.log('PHEW!')
  }
  const total = "20.00"
  const movieTitle = "Time Bandits"
  const showTime = "2/10/25 - 12:00pm"

  const [isOpened, setIsOpened] = useState(false);
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (isOpened) {
      ref.current?.showModal();
      document.body.classList.add('modal-open');
    } else {
      ref.current?.close();
      document.body.classList.remove('modal-open');
    }
  }, [isOpened]);

  const [isLoading, setIsLoading] = useState(true);
  const [cards, setCards] = useState<Card[]>([]);

  const loadCards = () => {
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
    setIsOpened(true)
  }

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

  const handlePayment = (card:{cardNumber: string,
    cardholderName: string,
    expirationDate: string,
    cvv: string,
    billingAddress: string}) => {
      router.push('/order-confirmation')
  };

  const selectCard = (card:Card) => {
    setCardData({
      cardNumber: card.cardNumber,
      cardholderName: card.cardholderName,
      expirationDate: card.expirationDate,
      cvv: card.cvv,
      billingAddress: card.billingAddress
    });
  }

  const defaultTickets = []
  for (let i = 0; i < 6; i++) {
    defaultTickets.push({
      id: i,
      seatID: i,
      seatNum: i,
      type: "adult"
    })
  }
  for (let i = 6; i < 9; i++) {
    defaultTickets.push({
      id: i,
      seatID: i,
      seatNum: i,
      type: "child"
    })
  }
  for (let i = 9; i < 12; i++) {
    defaultTickets.push({
      id: i,
      seatID: i,
      seatNum: i,
      type: "senior"
    })
  }

  const [tickets, setTickets] = useState<Ticket[]>(defaultTickets)


  return (
    <section className={styles.main_body}>
      <dialog ref={ref} className={styles.dialog}>
        <section className={styles.modal_body}>
          <section className={styles.modal_button}>
            <Button onClick={() => setIsOpened(false)}> X </Button>
          </section>
          <h1> Your Saved Cards </h1>
          <section className={styles.filter_section}>
              {isLoading ? (
                <p>Loading cards...</p>
              ) : (
              <ul>
                {cards.length > 0 ? (
                  cards.map((card: Card) => (
                    <li key={card.cardID} onClick={() => selectCard(card)}>
                      <PayCard
                        cardNum={card.cardNumber}
                        cardholderName={card.cardholderName}
                        expDate={card.expirationDate}
                        cvv={card.cvv}
                        billingAddress={card.billingAddress}
                      />
                    </li>
                  ))
                ) : (
                  <p>No results found</p>
                )}
              </ul>
              )}
          </section>
        </section>
      </dialog>
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
            {(
              <ul className={styles.list}>
                {tickets.length > 0 ? (
                  tickets.map((ticket: Ticket) => (
                    <li key={ticket.id}>
                      <TicketStub
                        ticket={ticket}
                      />
                    </li>
                  ))
                ) : (
                  <p>No Tickets found</p>
                )}
              </ul>
              )}
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
            <Button onClick={loadCards}> Use Saved Card </Button>
          </div>
        </div>
        <section className={styles.payment}>
          <h2>Payment Information</h2>
          <div className={styles.input_section}>
            <h1>Cardholder Name</h1>
            <input name="cardholderName" value={cardData.cardholderName || ''} onChange={handleCardChange} className={styles.text_fields}/>
          </div>
          <div className={styles.input_section}>
            <h1>Card Number</h1>
            <input name="cardNumber" value={cardData.cardNumber || ''} onChange={handleCardChange} className={styles.text_fields}/>
          </div>
          <div className={styles.input_section}>
            <h1>Expiration Date</h1>
            <input name="expirationDate" value={cardData.expirationDate || ''} onChange={handleCardChange} className={styles.text_fields}/>
          </div>
          <div className={styles.input_section}>
            <h1> CVV </h1>
            <input name="cvv" value={cardData.cvv || ''} onChange={handleCardChange} className={styles.text_fields}/>
          </div>
          <div className={styles.address_field}>
            <h1>Billing Address</h1>
            <input name="billingAddress" value={cardData.billingAddress || ''} onChange={handleCardChange} className={styles.text_fields}/>
          </div>
          <div className={styles.button}>
            <Button onClick={() => handlePayment(cardData)}> PlaceOrder </Button>
          </div>
        </section>
      </section>
  </section>
  );
};
