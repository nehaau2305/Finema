package com.TermProject.finema.entity;

import jakarta.persistence.*;
import java.util.Date;


@Entity
@Table(name = "showroom")
public class Showroom {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "room_number", nullable = false, length = 10)
    private String room;

    @Column(nullable = false)
    private int capacity;

    @ManyToOne
    @JoinColumn(name = "theater", nullable = false)
    private Theater theater;

    @Column(name = "theaterID")
    private int theaterId;

    public Showroom() {}

    public int getId() {return id;}
    public void setId(int id) {this.id = id;}
    public String getRoomNumber() {return room;}
    public void setRoomNumber(String room) {this.room = room;}
    public int getCapacity() {return capacity;}
    public void setCapacity(int capacity) {this.capacity = capacity;}
    public Theater getTheater() {return theater;}
    public void setTheater(Theater theater) {this.theater = theater;}
    public int getTheaterId() {return theaterId;}
    public void setTheaterId(int theaterId) {this.theaterId = theaterId;}
}