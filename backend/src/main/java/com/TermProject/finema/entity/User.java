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

    @Column(nullable = false, unique = true)
    @NotBlank(message = "Email cannot be blank")
    private String email;

    @NotBlank(message = "Password cannot be blank")
    private String password;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Review> reviews = new ArrayList<>();

    // default constructor
    public User() {}

    public int getId() {return id;}

    public void setId(int id) {this.id = id;}

    public String getName() {return name;}

    public void setName(String name) {this.name = name;}

    public String getEmail() {return email;}

    public void setEmail(String email) {this.email = email;}

    public String getPassword(String password) {return password;}

    // encrypt the password
    public void setPassword(String password) {this.password = BCryptPasswordEncoder().encode(password);}

    public List<Review> getReviews() {return reviews;}

    public void setReviews(List<Review> reviews) {this.reviews = reviews;}

}