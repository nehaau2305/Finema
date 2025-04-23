'use client';
import React, { useState, useEffect, useRef } from 'react';
import Button from '../components/Button';
import styles from './OrderSummary.module.css';
import { useRouter, useSearchParams } from 'next/navigation';
import { useToken } from '../components/useToken';
import TicketStub from '../components/TicketStub';
import PayCard from '../components/PayCard';

type ConsecutiveTimes =
  | 'TWELVE_AM'
  | 'THREE_AM'
  | 'SIX_AM'
  | 'NINE_AM'
  | 'TWELVE_PM'
  | 'THREE_PM'
  | 'SIX_PM'
  | 'NINE_PM';

const timeLabels: { [key in ConsecutiveTimes]: string } = {
  TWELVE_AM: '12:00 AM',
  THREE_AM: '3:00 AM',
  SIX_AM: '6:00 AM',
  NINE_AM: '9:00 AM',
  TWELVE_PM: '12:00 PM',
  THREE_PM: '3:00 PM',
  SIX_PM: '6:00 PM',
  NINE_PM: '9:00 PM'
};

type TicketTypes = 
  | 'child'
  | 'adult'
  | 'senior'

const typeLabels: { [key in TicketTypes] : number} = {
  child: 8.00,
  adult: 15.00,
  senior: 11.00,
}

interface Card {
  cardID?: number;
  cardNumber: string;
  cardholderName: string;
  expirationDate: string;
  cvv: string;
  billingAddress: string;
}

interface Order {
  numSeats:number;
  totalPrice:number;
  tickets: Ticket[];
  card: Card;
}

interface Ticket {
  seatID: number;
  seatNum: number;
  type: string;
}

export default function OrderSummary() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Retrieve data from query parameters
  const movieTitle = searchParams.get('name') || 'Unknown Movie';
  const date = searchParams.get('date') || 'Unknown Date';
  const time = searchParams.get('time') || 'Unknown Time';
  const showtimeId = searchParams.get('showtimeId') || 'Unknown showtimeId';
  const showroomId = searchParams.get('showroomId') || 'Unknown showtimeId';

  const searchParamTickets = JSON.parse(searchParams.get('tickets') || "[]");
  const [tickets, setTickets] = useState(searchParamTickets)

  const [token, setToken] = useToken('token');
  if (token === '') {
    router.push('/login'); // Redirect to login if token is missing
  }

  function goBack() {
    router.push(
      `/seat-selection?name=${movieTitle}&adult=${searchParams.get('adult')}&child=${searchParams.get('child')}&senior=${searchParams.get('senior')}&totalSeats=${searchParams.get('totalSeats')}&movieId=${searchParams.get('movieId')}&date=${searchParams.get('date')}&time=${searchParams.get('time')}&showtimeId=${searchParams.get('showtimeId')}&showroomId=${searchParams.get('showroomId')}`
    );
  }

  function goHome() {
    router.push('/web-user-home');
  }

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
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch cards');
        }
        if (response.status === 204) {
          return [];
        }
        return response.json();
      })
      .then((data) => {
        setCards(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching cards:', error);
        setIsLoading(false);
      });
    setIsOpened(true);
  };

  const [cardData, setCardData] = useState({
    cardNumber: '',
    cardholderName: '',
    expirationDate: '',
    cvv: '',
    billingAddress: '',
  });

  const handleCardChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCardData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const [costTotal, setCostTotal] = useState(0)
  const [savings, setSavings] = useState(0)
  const [fees, setFees] = useState(0)
  const [taxes, setTaxes] = useState(0)
  const [totalAfterAddOns, setTotalAfterAddOns] = useState(0)

  const reserveSeats = () => {
    const seats = [];
    let temp;
    for (let i = 0; i < tickets.length ; i++) {
      temp = {
        id:tickets[i].seatID,
        showtimeId:showtimeId,
        seatNum:tickets[i].seatNum,
        reserved:true
      }
      seats.push(temp)
    }
    fetch('http://localhost:8080/showtimes/reserve-seats/' + showtimeId, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(seats)
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to reserve seats');
        }
      })
      .catch((error) => {
        console.error('Error fetching cards:', error);
        setIsLoading(false);
      });
  }

  const handlePayment = (card: {
    cardNumber: string;
    cardholderName: string;
    expirationDate: string;
    cvv: string;
    billingAddress: string;
  }) => {
    const order:Order = {
      tickets: tickets,
      numSeats: tickets.length,
      totalPrice: totalAfterAddOns,
      card: card
    }
    fetch('http://localhost:8080/order/add', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(order)
    })
    .then((response) => response.json())
    .then((data) => {
      console.log(data)
      router.push('/order-confirmation');
    })
    .catch((error) => console.error(error))
    //reserveSeats()
  };

  const selectCard = (card: Card) => {
    setCardData({
      cardNumber: card.cardNumber,
      cardholderName: card.cardholderName,
      expirationDate: card.expirationDate,
      cvv: card.cvv,
      billingAddress: card.billingAddress,
    });
  };

  const changeType = ({ticket, type} : {ticket:Ticket, type:string}) => {
    let newTickets = []
    for (let i = 0 ; i < tickets.length ; i++) {
      if (tickets[i].seatID == ticket.seatID) {
        newTickets.push(
          {
            seatID: ticket.seatID,
            seatNum: ticket.seatNum,
            type: type
          }
        )
      } else {
        newTickets.push(tickets[i])
      }
    }
    setTickets(newTickets)
  }

  const removeTicket = (ticket :Ticket) => {
    const tempTickets = []
    for (let i = 0; i < tickets.length ; i++) {
      if (tickets[i].seatID != ticket.seatID) {
        tempTickets.push(tickets[i])
      }
    }
    setTickets(tempTickets)
  }

  const [promotionCode, setPromotionCode] = useState('')

  const addPromotion = () => {
    /**
     * Send code to backend to verify promotion
     * Send back the discount for each ticket type
     */
    console.log(promotionCode)
  }

  useEffect(() => {
    let tempTotal = 0
    let tempSavings = 0
    for (let i = 0; i < tickets.length ; i++) {
      tempTotal += typeLabels[tickets[i].type as TicketTypes]
      /**
       * Add promotion stuff here
       * Have it add up the savings it applies
       */
    }
    setCostTotal(tempTotal)
    setSavings(tempSavings)
    setFees(0)
    setTaxes(tempTotal * .04) // As far as I can tell it would be a 4% tax, I think depending on physical location of theater this may change
    setTotalAfterAddOns(tempTotal - tempSavings + fees + tempTotal * .04)

  }, [tickets/*, promotions*/])

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
            <li> Showtime: {date + " " + timeLabels[time as ConsecutiveTimes]} </li>
          </ul>
        </section>
        <section className={styles.ticket_area}>
          <h1> Tickets: </h1>
          <ul className={styles.list}>
            {tickets.length > 0 ? (
              tickets.map((ticket: Ticket) => (
                <li key={ticket.seatID}>
                  <TicketStub ticket={ticket} changeTicketType={changeType} deleteTicket={removeTicket} />
                </li>
              ))
            ) : (
              <p>No Tickets found</p>
            )}
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
        <h2 id={styles.payment_title}> Order Total </h2>
        <div className={styles.reciept}>
          <h2> Ticket Price: {'$' + costTotal.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')} </h2>
          <h2> Savings: {'$' + savings.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')} </h2>
          <h2> Fees: {'$' + fees.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')} </h2>
          <h2> Taxes: {'$' + taxes.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')} </h2>
          <h2> Total: {'$' + totalAfterAddOns.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')} </h2> 
          {/** Significantly over complicated this (copied from online), I hope they dont spend more than 999 dollars but if they do it will display correctly lol */}
        </div>
        <section className={styles.promotions}>
          <div id={styles.promotion_code}>
            <h2>Enter Promotion Code</h2>
            <input
              name="promotionCode"
              value={promotionCode || ''}
              onChange={e => setPromotionCode(e.target.value)}
              className={styles.text_fields}
            />
          </div>
          <div className={styles.button}>
            <Button onClick={addPromotion}> Add Promotion </Button>
          </div>
        </section>
        <h2 id={styles.payment_title}>Payment Information</h2>
        <section className={styles.payment}>
          <div className={styles.input_section}>
            <h1>Cardholder Name</h1>
            <input
              name="cardholderName"
              value={cardData.cardholderName || ''}
              onChange={handleCardChange}
              className={styles.text_fields}
            />
          </div>
          <div className={styles.input_section}>
            <h1>Card Number</h1>
            <input
              name="cardNumber"
              value={cardData.cardNumber || ''}
              onChange={handleCardChange}
              className={styles.text_fields}
            />
          </div>
          <div className={styles.input_section}>
            <h1>Expiration Date</h1>
            <input
              name="expirationDate"
              value={cardData.expirationDate || ''}
              onChange={handleCardChange}
              className={styles.text_fields}
            />
          </div>
          <div className={styles.input_section}>
            <h1> CVV </h1>
            <input
              name="cvv"
              value={cardData.cvv || ''}
              onChange={handleCardChange}
              className={styles.text_fields}
            />
          </div>
          <div className={styles.address_field}>
            <h1>Billing Address</h1>
            <input
              name="billingAddress"
              value={cardData.billingAddress || ''}
              onChange={handleCardChange}
              className={styles.text_fields}
            />
          </div>
          <div className={styles.button}>
            <Button onClick={loadCards}> Use Saved Card </Button>
          </div>
        </section>
        <div id={styles.saved_card}>
            <Button onClick={() => handlePayment(cardData)}> Place Order </Button>
        </div>
      </section>
    </section>
  );
}