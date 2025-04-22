package com.TermProject.finema.entity;

import jakarta.persistence.*;
import java.util.Date;
import java.util.List;


@Entity
@Table(name = "orders")
public class Order {
    //aka "booking" or "payment"
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    @JoinColumn(name = "user", nullable = false) // Foreign key for Showtime
    private User user;

    @Column(name = "num_seats", nullable = false)
    private int numSeats;

    @Column(name = "total_price", nullable = false)
    private double totalPrice;

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true)
    List<Ticket> tickets;

    @ManyToOne
    @JoinColumn(name = "promo")
    private Promotion promo;

    @ManyToOne
    @JoinColumn(name = "card", nullable = false)
    private Card card;

    public Order() {}

    public int getId() {return id;}
    public void setId(int id) {this.id = id;}
    public User getUser() {return user;}
    public void setUser(User user) {this.user = user;}
    public int getNumSeats() {return numSeats;}
    public void setNumSeats(int numSeats) {this.numSeats = numSeats;}
    public double getTotalPrice() {return totalPrice;}
    public void setTotalPrice(double totalPrice) {this.totalPrice = totalPrice;}
    public List<Ticket> getTickets() {return tickets;}
    public void setTickets(List<Ticket> tickets) {this.tickets = tickets;}
    public Promotion getPromo() {return promo;}
    public void setPromo(Promotion promo) {this.promo = promo;}
    public Card getCard() {return card;}
    public void setCard(Card card) {this.card = card;}
}