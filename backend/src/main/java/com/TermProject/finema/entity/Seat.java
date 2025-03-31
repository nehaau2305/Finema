package com.TermProject.finema.entity;

import jakarta.persistence.*;
import java.util.Date;

@Entity
@Table(name = "seat")
public class Seat {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "showroomID", nullable = false)
    private int showroomID;

    @ManyToOne
    @JoinColumn(name = "showroom", nullable = false) // Foreign key for Showroom
    private Showroom showroom;

    @Column(name = "seat_number", nullable = false)
    private int seatNum;

    @Column(name = "reserved")
    private boolean reserved = false;

    public int getId() {return id;}
    public void setId(int id) {this.id = id;}
    public int getShowroomID() {return showroomID;}
    public void setShowroomID(int showroomID) {this.showroomID = showroomID;}
    public Showroom getShowroom() {return showroom;}
    public void setShowroom(Showroom showroom) {this.showroom = showroom;}
    public int getSeatNum() {return seatNum;}
    public void setSeatNum(int seatNum) {this.seatNum = seatNum;}
    public boolean getReserved() {return reserved;}
    public void setReserved(boolean reserved) {this.reserved = reserved;}
}