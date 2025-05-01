package com.TermProject.finema.entity;

import jakarta.persistence.*;
import java.util.Date;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonManagedReference;


@Entity
@Table(name = "orders")
public class Order {
    //aka "booking" or "payment"
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    @JoinColumn(name = "user", nullable = false) // Foreign key for User
    private User user;

    @Column(name = "showtimeID", nullable = false)
    private int showtimeID;

    @ManyToOne
    @JoinColumn(name = "showtime", nullable = false) // Foreign key for Showtime
    private Showtime showtime;

    @Column(name = "movieId", nullable = false) // Foreign key for Movie
    private int movieId;

    @Column(name = "num_seats", nullable = false)
    private int numSeats;

    @Column(name = "total_price", nullable = false)
    private double totalPrice;

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    List<Ticket> tickets;

    @ManyToOne
    @JoinColumn(name = "card", nullable = false)
    private Card card;

    public Order() {}

    public int getId() {return id;}
    public void setId(int id) {this.id = id;}
    public User getUser() {return user;}
    public void setUser(User user) {this.user = user;}
    public int getMovieId() {return movieId;}
    public void setMovieId(int movieId) {this.movieId = movieId;}
    public int getShowtimeID() {return showtimeID;}
    public void setShowtimeID(int showtimeID) {this.showtimeID = showtimeID;}
    public Showtime getShowtime() {return showtime;}
    public void setShowtime(Showtime showtime) {this.showtime = showtime;}
    public int getNumSeats() {return numSeats;}
    public void setNumSeats(int numSeats) {this.numSeats = numSeats;}
    public double getTotalPrice() {return totalPrice;}
    public void setTotalPrice(double totalPrice) {this.totalPrice = totalPrice;}
    public List<Ticket> getTickets() {return tickets;}
    public void setTickets(List<Ticket> tickets) {this.tickets = tickets;}
    public Card getCard() {return card;}
    public void setCard(Card card) {this.card = card;}
}