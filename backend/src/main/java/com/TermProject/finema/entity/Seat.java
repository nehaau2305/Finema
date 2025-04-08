package com.TermProject.finema.entity;

import jakarta.persistence.*;
import java.util.Date;

@Entity
@Table(name = "seat")
public class Seat {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "showtimeID", nullable = false)
    private int showtimeID;

    @ManyToOne
    @JoinColumn(name = "showtime", nullable = false) // Foreign key for Showtime
    private Showtime showtime;

    @Column(name = "seat_number", nullable = false)
    private int seatNum;

    @Column(name = "reserved")
    private boolean reserved = false;

    public int getId() {return id;}
    public void setId(int id) {this.id = id;}
    public int getShowtimeID() {return showtimeID;}
    public void setShowtimeID(int showtimeID) {this.showtimeID = showtimeID;}
    public Showtime getShowtime() {return showtime;}
    public void setShowtime(Showtime showtime) {this.showtime = showtime;}
    public int getSeatNum() {return seatNum;}
    public void setSeatNum(int seatNum) {this.seatNum = seatNum;}
    public boolean getReserved() {return reserved;}
    public void setReserved(boolean reserved) {this.reserved = reserved;}
}