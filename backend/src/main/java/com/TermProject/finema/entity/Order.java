package com.TermProject.finema.entity;

import jakarta.persistence.*;
import java.util.Date;

@Entity
@Table(name = "order")
public class Order {
    //aka "booking" or "payment"
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    @JoinColumn(name = "showtime", nullable = false) // Foreign key for Showtime
    private Showtime showtime;

    @ManyToOne
    @JoinColumn(name = "user", nullable = false) // Foreign key for Showtime
    private User user;

    @Column(name = "num_seats", nullable = false)
    private int numSeats;

    @Column(name = "total_price", nullable = false)
    private double totalPrice;

    public Order() {}

    public int getId() {return id;}
    public void setId(int id) {this.id = id;}
    public Showtime getShowtime() {return showtime;}
    public void setShowtime(Showtime showtime) {this.showtime = showtime;}
    public User getUser() {return user;}
    public void setUser(User user) {this.user = user;}
    public int getNumSeats() {return numSeats;}
    public void setNumSeats(int numSeats) {this.numSeats = numSeats;}
    public double getTotalPrice() {return totalPrice;}
    public void setTotalPrice(double totalPrice) {this.totalPrice = totalPrice;}
}