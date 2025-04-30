package com.TermProject.finema.entity;

import java.time.LocalDateTime;
import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
public class ForgotPasswordToken {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(nullable = false, unique = true)
    private String token;

    @OneToOne
    @JoinColumn(name = "user", nullable = false)
    private User user;

    @Column
    private LocalDateTime expirationTime;


    public ForgotPasswordToken() {}

    public int getId() {return id;}
    public String getToken() {return token;}
    public void setToken(String token) {this.token = token;}
    public User getUser() {return user;}
    public void setUser(User user) {this.user = user;}
    public LocalDateTime getExpirationTime() {return expirationTime;}
    public void setExpirationTime(LocalDateTime expirationTime) {this.expirationTime = expirationTime;}
}