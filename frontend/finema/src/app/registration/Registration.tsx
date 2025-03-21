"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "../components/Button";
import styles from "./Registration.module.css";

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

    return true;
  } catch (error) {
    console.error("Error registering user:", error);
    return false;
  }
}

async function registerCard(cardInfo: CardInfo) {
  try {
    console.log("Registering card:", cardInfo);
    const response = await fetch(`http://localhost:8080/auth/add-card`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cardInfo),
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
  const [msg, setMsg] = useState("");

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [homeAddress, setHomeAddress] = useState("");
  const [promotions, setPromotions] = useState(false);

  const [cardNumber, setCardNum] = useState("");
  const [expirationDate, setExpDate] = useState("");
  const [billingAddress, setBillAddress] = useState("");
  const [showPaymentInfo, setShowPaymentInfo] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    //register user first
    const userInfo: User = { name, phone, email, password, homeAddress, promotions };
    const userRegistered = await registerUser(userInfo);

    if (!userRegistered) {
      setMsg("Error registering user.");
      return;
    }

    //add card second if card was added
    if (showPaymentInfo) {
      const cardInfo: CardInfo = { email, cardNumber, expirationDate, billingAddress };
      const cardRegistered = await registerCard(cardInfo);

      if (!cardRegistered) {
        setMsg("Error registering payment info.");
        return;
      }
    }

    router.push("/registration-confirmation");
  };

  return (
    <div className={styles.main_body}>
      <div className={styles.info_box}>
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
              <Button type="button" onClick={() => setShowPaymentInfo(true)}>Add Card</Button>
            )}
            {showPaymentInfo && (
              <div>
                <h2 className={styles.big_headers}> Payment Information</h2>
                <h2 className={styles.headers}>Card Number</h2>
                <input value={cardNumber} onChange={(e) => setCardNum(e.target.value)} className={styles.text_fields} required />
                <h2 className={styles.headers}>Expiration Date</h2>
                <input value={expirationDate} onChange={(e) => setExpDate(e.target.value)} className={styles.text_fields} required />
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
}




 