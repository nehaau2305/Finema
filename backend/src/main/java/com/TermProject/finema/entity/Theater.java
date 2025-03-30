package com.TermProject.finema.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import java.util.Date;


@Entity
@Table(name = "theater")
public class Theater {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "name", nullable = false)
    @NotBlank(message = "Name cannot be blank")
    private String name;

    @Column(name = "location", nullable = false)
    @NotBlank(message = "City cannot be blank")
    private String city;

    @Column(name = "address", nullable = false)
    @NotBlank(message = "Address cannot be blank")
    private String address;

    @Column(name = "num_rooms", nullable = false)
    private int numRooms = 1;

    public Theater() {}

    public int getId() {return id;}
    public void setId(int id) {this.id = id;}
    public String getName() {return name;}
    public void setName(String name) {this.name = name;}
    public String getAddress() {return address;}
    public void setAddress(String address) {this.address = address;}
    public String getCity() {return city;}
    public void setCity(String city) {this.city = city;}
    public int getNumRooms() {return numRooms;}
    public void setNumRooms(int numRooms) {this.numRooms = numRooms;}

}