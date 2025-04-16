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
    @JoinColumn(name = "order", nullable = false) // Foreign key for Order
    private Order order;

    @ManyToOne
    @JoinColumn(name = "seat", nullable = false) // Foreign key for Seat
    private Seat seat;

    @Column(name = "num_seats", nullable = false)
    private int numSeats;

    @Enumerated(EnumType.STRING)
    private TicketType ticketType;

    public Ticket() {}

    public int getId() {return id;}
    public void setId(int id) {this.id = id;}
    public Order getOrder() {return order;}
    public void setOrder(Order order) {this.order = order;}
    public Seat getSeat() {return seat;}
    public void setSeat(Seat seat) {this.seat = seat;}
    public TicketType getTicketType() {return ticketType;}
    public void setTicketType(TicketType ticketType) {this.ticketType = ticketType;}
    public double getPrice() {return ticketType.getPrice();}
}