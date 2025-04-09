'use client'
import React, { useState } from "react";
import styles from './PickDate.module.css'
import TopBar from '../components/TopBar';
import Button from '../components/Button';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useRouter } from 'next/navigation'
import { useToken } from '../components/useToken'

export default function PickDate() {
    const router = useRouter();
    const [date, setDate] = useState(new Date());
    const [savedDate, setSavedDate] = useToken("selectedDate")
    const today = new Date();

    const handleDate = (selectedDate: Date) => {
        setDate(selectedDate)
        console.log(selectedDate)
        setSavedDate(selectedDate.toISOString())
        //localStorage.setItem("selectedDate", selectedDate.toISOString());
    }

    const handleSelectDate = () => {
        console.log(date)
        setSavedDate(date.toISOString())
        router.push('./schedule-movies')
    }

    const handleGoBack = () => {
        router.push('./admin-home')
    }

    return (
        <div>
        <TopBar loggedIn={true} showEditProfile={false}/>

        <section className={styles.main_body}>
            
              <div className={styles.input_date}>
                <h1> Select Date </h1>
                <div className={styles.input_box}>
                    <DatePicker selected={date} onChange={(date) => handleDate(date!)} minDate={today} />
                </div>
        
                <Button onClick={handleSelectDate}> Select Date </Button>
              </div>
              <Button onClick={handleGoBack}> Go Back </Button>
    
        </section>
      </div>
  );
};