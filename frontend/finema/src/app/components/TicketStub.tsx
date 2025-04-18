'use client'
import React, {useEffect, useRef, useState} from 'react';
import Button from '../components/Button';
import styles from './TicketStub.module.css'
import { useRouter, useSearchParams } from 'next/navigation';


interface Ticket {
  seatID:number,
  seatNum:number,
  type:string
}

export default function OrderSummary({ticket, changeTicketType, deleteTicket} : {ticket:Ticket, changeTicketType:({ticket, type} : {ticket:Ticket, type:string})=>void, deleteTicket:(ticket : Ticket)=>void}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [ticketType, setTicketType] = useState(ticket.type)
  console.log(ticket)

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

  const [changeToTicketType, setChangeToTicketType] = useState(ticket.type)

  const handleChange = () => {
    setTicketType(changeToTicketType)
    changeTicketType({ticket:ticket, type:changeToTicketType})
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
            <select defaultValue={ticketType} onChange={e => setChangeToTicketType(e.target.value)}>
              <option value='child'>child</option>
              <option value='adult'>adult</option>
              <option value='senior'>senior</option>
            </select>
            <Button onClick={handleChange}> Change </Button>
          </section>
        </dialog>
        <h1> Type: {ticketType} </h1> 
        <h1> Seat: {ticket.seatNum} </h1>
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
