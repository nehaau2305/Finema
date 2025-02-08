package com.TermProject.finema.entity;
import jakarta.persistence.*;

@Entity
public class Movie {
    @Id // denotes primary key
    @GeneratedValue(strategy = GenerationType.IDENTITY)  // auto-generates primary key value
    private int id;

    private String title;
    private String category;
    private String director;
    private String producer;

    @Column(length = 5000)
    private String synopsis;

    private String trailerPicture; // will hold URL
    private String trailerVideo; // will hold URL

    @Enumerated(EnumType.STRING)
    private MpaaRating mpaaRating;

    //HAVE TO ADD REVIEWS & CAST

    //ADD GETTER & SETTER METHODS

}