package com.TermProject.finema.entity;

import jakarta.persistence.*;
import java.util.Date;

@Entity
@Table(name = "ticket")
public class Ticket {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    @JoinColumn(name = "order_id", nullable = false) // Foreign key for Order
    private Order order;

    @ManyToOne
    @JoinColumn(name = "showtime", nullable = false) // Foreign key for Showtime
    private Showtime showtime;

    @ManyToOne
    @JoinColumn(name = "seat", nullable = false) // Foreign key for Seat
    private Seat seat;

    @Enumerated(EnumType.STRING)
    private TicketType ticketType;

    public Ticket() {}

    public int getId() {return id;}
    public void setId(int id) {this.id = id;}
    public Order getOrder() {return order;}
    public void setOrder(Order order) {this.order = order;}
    public Showtime getShowtime() {return showtime;}
    public void setShowtime(Showtime showtime) {this.showtime = showtime;}
    public Seat getSeat() {return seat;}
    public void setSeat(Seat seat) {this.seat = seat;}
    public TicketType getTicketType() {return ticketType;}
    public void setTicketType(TicketType ticketType) {this.ticketType = ticketType;}
    public double getPrice() {return ticketType.getPrice();}
}