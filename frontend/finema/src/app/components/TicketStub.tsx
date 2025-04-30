'use client'
import React, {useEffect, useRef, useState} from 'react';
import Button from '../components/Button';
import styles from './TicketStub.module.css'
import { useRouter, useSearchParams } from 'next/navigation';


interface Seat {
  id:number;
  showtimeID:number;
  seatNum:number;
  reserved:boolean;
}

interface Ticket {
  seatID:number;
  seat:Seat;
  ticketAge:string;
}

export default function OrderSummary({ticket, changeTicketAge, deleteTicket} : {ticket:Ticket, changeTicketAge:({ticket, ticketAge} : {ticket:Ticket, ticketAge:string})=>void, deleteTicket:(ticket : Ticket)=>void}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [ticketAge, setTicketAge] = useState(ticket.ticketAge)

  function goSeat() {
    router.push(
      `/seat-selection?name=${searchParams.get('name')}&adult=${searchParams.get('adult')}&child=${searchParams.get('child')}&senior=${searchParams.get('senior')}&totalSeats=${searchParams.get('totalSeats')}&movieId=${searchParams.get('movieId')}&date=${searchParams.get('date')}&time=${searchParams.get('time')}&showtimeId=${searchParams.get('showtimeId')}&showroomId=${searchParams.get('showroomId')}`
    );
  }

  const [showSelf, setShowSelf] = useState(true)

  function handleDeleteTicket() {
    deleteTicket(ticket)
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

  const [changeToTicketAge, setChangeToTicketAge] = useState(ticket.ticketAge)

  const handleChange = () => {
    setTicketAge(changeToTicketAge)
    changeTicketAge({ticket:ticket, ticketAge:changeToTicketAge})
  }


  return (
    <section>
      {showSelf ? (
      <section className={styles.main_body}>
        <dialog ref={ref} className={styles.dialog}>
          <section className={styles.modal_body}>
            <section className={styles.modal_button}>
              <Button onClick={() => setIsOpened(false)}> X </Button>
            </section>
            <h1 className={styles.headers}> Change Type </h1>
            <select defaultValue={ticketAge} onChange={e => setChangeToTicketAge(e.target.value)}>
              <option value='CHILD'>child</option>
              <option value='ADULT'>adult</option>
              <option value='SENIOR'>senior</option>
            </select>
            <Button onClick={handleChange}> Change </Button>
          </section>
        </dialog>
        <h1> Type: {ticketAge} </h1> 
        <h1> Seat: {ticket.seat.seatNum} </h1>
        <div className={styles.button}>
          <Button onClick={() => setIsOpened(true)}> Edit Type </Button>
        </div>
        <div className={styles.button}>
          <Button onClick={goSeat}> Edit Seat </Button>
        </div>
        <div className={styles.button}>
          <Button onClick={handleDeleteTicket}> Delete </Button>
        </div>
      </section>
    ) : 
    (<div></div>)}
      
    </section>
  );
};
