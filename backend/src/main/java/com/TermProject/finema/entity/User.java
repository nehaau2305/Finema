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
    private String cardNumber;

    @Column(nullable = true)
    private String expirationDate;

    @Column(nullable = true)
    private String billingAddress;

    private boolean isAdmin;


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
    public String getCardNumber() {return cardNumber;}
    public void setCardNumber(String cardNumber) {this.cardNumber = cardNumber;}
    public String getExpirationDate() {return expirationDate;}
    public void setExpirationDate(String expirationDate) {this.expirationDate = expirationDate;}
    public String getBillingAddress() {return billingAddress;}
    public void setBillingAddress(String billingAddress) {this.billingAddress = billingAddress;}
    public boolean isAdmin() {return isAdmin;}
    public void setAdmin(boolean isAdmin) {this.isAdmin = isAdmin;}
}