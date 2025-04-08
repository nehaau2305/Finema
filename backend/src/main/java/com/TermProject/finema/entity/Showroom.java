package com.TermProject.finema.entity;

import jakarta.persistence.*;
import java.util.Date;


@Entity
@Table(name = "showroom")
public class Showroom {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "roomNumber")
    private String room;

    @Column(nullable = false)
    private int capacity;


    public Showroom() {}

    public int getId() {return id;}
    public void setId(int id) {this.id = id;}
    public String getRoomNumber() {return room;}
    public void setRoomNumber(String room) {this.room = room;}
    public int getCapacity() {return capacity;}
    public void setCapacity(int capacity) {this.capacity = capacity;}
}