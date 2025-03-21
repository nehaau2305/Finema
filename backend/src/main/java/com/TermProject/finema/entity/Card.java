package com.TermProject.finema.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "card")
public class Card {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String cardNumber;
    private String cardholderName;
    private String expirationDate;
    private String billingAddress;
    private String cvv;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    public Card() {
        // Default constructor for JPA
    }

    public Card(String cardNumber, String cardholderName, String expirationDate, String billingAddress, String cvv, User user) {
        this.cardNumber = cardNumber;
        this.cardholderName = cardholderName;
        this.expirationDate = expirationDate;
        this.billingAddress = billingAddress;
        this.cvv = cvv;
        this.user = user;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
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

    public String getBillingAddress() {
        return billingAddress;
    }

    public void setBillingAddress(String billingAddress) {
        this.billingAddress = billingAddress;
    }

    
    public String getCvv() {
        return cvv;
    }

    public void setCvv(String cvv) {
        this.cvv = cvv;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}