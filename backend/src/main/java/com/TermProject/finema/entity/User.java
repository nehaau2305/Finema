package com.TermProject.finema.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import java.util.ArrayList;
import java.util.List;


import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import com.TermProject.finema.entity.Review;


@Entity
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)  // auto-generates primary key value
    private int id;

    @NotBlank(message = "Name cannot be blank")
    private String name;

    @Column(nullable = true)
    private String phone;

    @Column(nullable = false, unique = true)
    @NotBlank(message = "Email cannot be blank")
    private String email;

    @NotBlank(message = "Password cannot be blank")
    private String password;

    @Column(nullable = true)
    private String homeAddress;

    @Column(nullable = true)
    private boolean isAdmin;

    @Column(nullable = true)
    private String token;

    @Column(nullable = true)
    private boolean active = false;

    @Column(nullable = true)
    private boolean suspended = false;

    @Column(nullable = false)
    private boolean promotions = false;



    // default constructor
    public User() {}

    public int getId() {return id;}
    public void setId(int id) {this.id = id;}
    public String getName() {return name;}
    public void setName(String name) {this.name = name;}
    public String getPhone() {return phone;}
    public void setPhone(String phone) {this.phone = phone;}
    public String getEmail() {return email;}
    public void setEmail(String email) {this.email = email;}
    public String getPassword() {return password;}
    public void setPassword(String password) {this.password = password;}
    public String getHomeAddress() {return homeAddress;}
    public void setHomeAddress(String homeAddress) {this.homeAddress = homeAddress;}
    public boolean getIsAdmin() {return isAdmin;}
    public void setAdmin(boolean isAdmin) {this.isAdmin = isAdmin;}
    public String getToken() {return token;}
    public void setToken(String token){this.token = token;}


    public boolean isActive() {return active;}
    public void setActive(boolean active) {this.active = active;}
    public boolean isSuspended() {return suspended;}
    public void setSuspended(boolean suspended) {this.suspended = suspended;}
    public boolean isPromotions() {return promotions;}
    public void setPromotions(boolean promotions) {this.promotions = promotions;}
}