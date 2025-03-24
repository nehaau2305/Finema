package com.TermProject.finema.entity;

import jakarta.persistence.*;
import java.util.Date;


@Entity
@Table(name = "card")
public class Card {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer cardID;

    private Integer userID;

    @Column(name = "cardNumber", unique = true, nullable = false)
    private String cardNumber;

    @Column(name = "cardholderName", nullable = false, length = 255)
    private String cardholderName;

    @Column(name = "expirationDate", nullable = false, length = 5)
    private String expirationDate;

    @Column(name = "cvv")
    private String cvv;


    @Column(name = "billing_address", length = 255)
    private String billingAddress;

    @ManyToOne
    @JoinColumn(name = "user", nullable = false)
    private User user;

    public Card() {
        // Default constructor for JPA
    }

    public Card(String cardNumber, String cardholderName, String expirationDate, String billingAddress, String cvv, User user) {
        this.cardID = 0;
        this.cardNumber = cardNumber;
        this.cardholderName = cardholderName;
        this.expirationDate = expirationDate;
        this.billingAddress = billingAddress;
        this.cvv = cvv;
        this.userID = user.getId();
    }

    public Integer getCardID() {
        return cardID;
    }

    public void setCardID(Integer cardID) {
        this.cardID = cardID;
    }

    public String getCardNumber() {
        return cardNumber;
    }

    public void setCardNumber(String cardNumber) {
        this.cardNumber = cardNumber;
    }

    public String getCardholderName() {
        return cardholderName;
    }

    public void setCardholderName(String cardholderName) {
        this.cardholderName = cardholderName;
    }

    public String getExpirationDate() {
        return expirationDate;
    }

    public void setExpirationDate(String expirationDate) {
        this.expirationDate = expirationDate;
    }

    public String getCvv() {
        return cvv;
    }

    public void setCvv(String cvv) {
        this.cvv = cvv;
    }

    public String getBillingAddress() {
        return billingAddress;
    }

    public void setBillingAddress(String billingAddress) {
        this.billingAddress = billingAddress;
    }

    public Integer getUserID() {
        return userID;
    }

    public void setUserID(User user) {
        this.userID = user.getId();
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

}