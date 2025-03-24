"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "../components/Button";
import styles from "./Registration.module.css";
import Image from 'next/image'
import finemalogo from './finemalogo.png'
//import { console } from "inspector";

interface User {
  name: string;
  phone: string;
  email: string;
  password: string;
  homeAddress: string;
  promotions: boolean;
}

interface CardInfo {
  email: string;
  cardNumber: string;
  expirationDate: string;
  cvv: string;
  billingAddress: string;
}

interface Card {
  email: string;
  cardNumber: string;
  cardholderName: string;
  expirationDate: string;
  cvv: string;
  billingAddress: string;
}

async function registerUser(userInfo: User) {
  try {
    console.log("Registering user:", userInfo);
    const response = await fetch(`http://localhost:8080/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userInfo),
    });

    if (!response.ok) {
      throw new Error("Failed to register user");
    }

    return response.text();
  } catch (error) {
    console.error("Error registering user:", error);
    return null;
  }
}

async function registerCard(card: Card, token: string) {

  try {
    console.log("Registering card:", card);
    const response = await fetch(`http://localhost:8080/users/addCard`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(card),
    });

    if (!response.ok) {
      throw new Error("Failed to register card");
    }

    return true;
  } catch (error) {
    console.error("Error registering card:", error);
    return false;
  }
}

export default function Registration() {
  const router = useRouter();
  const [showCode, setShowCode] = useState(false);
  const [code, setCode] = useState("");
  const [enteredCode, setEnteredCode] = useState("");
  const [msg, setMsg] = useState("");

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [homeAddress, setHomeAddress] = useState("");
  const [promotions, setPromotions] = useState(false);


  const [cardholderName, setcardholderName] = useState("");
  const [cardNumber, setCardNum] = useState("");
  const [expirationDate, setExpDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [billingAddress, setBillAddress] = useState("");
  const [showPaymentInfo, setShowPaymentInfo] = useState(false);

  const handleSubmitCode = async (e: any) => {
    e.preventDefault();

    console.log(typeof(code))
    console.log(code)
    console.log(Array.from(enteredCode))

    if (code !== enteredCode) {
      setMsg("Code is incorrect");
      return;
    }

    //register user first
    const userInfo: User = { name, phone, email, password, homeAddress, promotions };
    const userRegistered = await registerUser(userInfo);

    if (userRegistered === null) {
      setMsg("Error registering user.");
      return;
    }

    //add card second if card was added
    if (showPaymentInfo) {
      const card: Card = { email, cardNumber, cardholderName, expirationDate, cvv, billingAddress };
      const cardRegistered = await registerCard(card, userRegistered);

      if (!cardRegistered) {
        setMsg("Error registering payment info.");
        return;
      }
    }

    router.push("/registration-confirmation");
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const userInfo: User = { name, phone, email, password, homeAddress, promotions };

    fetch('http://localhost:8080/users/sendregistercode', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userInfo)
    })
    .then(response => {
      if (!response.ok) {
        console.log(response);
        return response.text().then(text => { throw new Error(text) });
      }
      return response.text();
    })
    .then(((response) => {
      console.log(typeof(response))
      setCode(response);
      setShowCode(true);
    }))
    .catch(error => console.error('Error sending code:', error));


  }

  const regiseterUserPage = (
    <div className={styles.main_body}>
      <div className={styles.info_box}>
        <div className={styles.logo}>
          <Image
            src={finemalogo}
            width={200}
            height={200}
            alt="finema logo"
            />
        </div>
        <h1 className={styles.big_headers}> Sign Up </h1>
        <section className={styles.inputs}>
          <form onSubmit={handleSubmit}>
            <div>
              <h2 className={styles.headers}>Name*</h2>
              <input value={name} onChange={(e) => setName(e.target.value)} className={styles.text_fields} required />
              <h2 className={styles.headers}>Phone Number</h2>
              <input value={phone} onChange={(e) => setPhone(e.target.value)} className={styles.text_fields} />
              <h2 className={styles.headers}>Email*</h2>
              <input value={email} onChange={(e) => setEmail(e.target.value)} className={styles.text_fields} required />
              <h2 className={styles.headers}>Set Password*</h2>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className={styles.text_fields} required />
              <h2 className={styles.headers}>Home Address</h2>
              <input value={homeAddress} onChange={(e) => setHomeAddress(e.target.value)} className={styles.text_fields} />
            </div>
            {!showPaymentInfo && (
              <div className={styles.add_card}>
                <Button type="button" onClick={() => setShowPaymentInfo(true)}>Add Card</Button>
              </div>
            )}
            {showPaymentInfo && (
              <div>
                <h2 className={styles.big_headers}> Payment Information</h2>
                <h2 className={styles.headers}>Card Holder Name</h2>
                <input value={cardholderName} onChange={(e) => setcardholderName(e.target.value)} className={styles.text_fields} required />
                <h2 className={styles.headers}>Card Number</h2>
                <input value={cardNumber} onChange={(e) => setCardNum(e.target.value)} className={styles.text_fields} required />
                <h2 className={styles.headers}>Expiration Date</h2>
                <input value={expirationDate} onChange={(e) => setExpDate(e.target.value)} className={styles.text_fields} required />
                <h2 className={styles.headers}>CVV</h2>
                <input value={cvv} onChange={(e) => setCvv(e.target.value)} className={styles.text_fields} required />
                <h2 className={styles.headers}>Billing Address</h2>
                <input value={billingAddress} onChange={(e) => setBillAddress(e.target.value)} className={styles.text_fields} required />
              </div>
            )}

            <section className={styles.promotion}>
              <div>
                <h2>Subscribe for email Promotions</h2>
                <input type="radio" value="true" checked={promotions === true} onChange={() => setPromotions(true)} />
              </div>
              <div>
                <h2>Unsubscribe from email Promotions</h2>
                <input type="radio" value="false" checked={promotions === false} onChange={() => setPromotions(false)} />
              </div>
            </section>

            <div className={styles.submit}>
              <Button type="submit">Create Account</Button>
            </div>
          </form>
          {msg && <p>{msg}</p>}
        </section>
      </div>
    </div>
  );

  const enterCodePage = (
    <div className={styles.main_body}>
      <div className={styles.info_box}>
        <div className={styles.logo}>
          <Image
            src={finemalogo}
            width={200}
            height={200}
            alt="finema logo"
            />
        </div>
        <h1 className={styles.big_headers}> Sign Up </h1>
        <section className={styles.inputs}>
          <form onSubmit={handleSubmitCode}>
            <div>
              <h2 className={styles.headers}>Enter Code From Email:</h2>
              <input value={enteredCode} onChange={(e) => setEnteredCode(e.target.value)} className={styles.text_fields} required />
            </div>
            <div className={styles.submit}>
              <Button type="submit">Verify Registration</Button>
            </div>
          </form>
          {msg && <p>{msg}</p>}
        </section>
      </div>
    </div>
  );

  return showCode ? enterCodePage : regiseterUserPage;
}





 