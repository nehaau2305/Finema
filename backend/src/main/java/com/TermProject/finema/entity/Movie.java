package com.TermProject.finema.entity;

import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "movie")
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

    private boolean nowShowing;
    private boolean comingSoon;

    @Column(length = 5000)
    private String cast;

    private double childTicketPrice;
    private double adultTicketPrice;
    private double seniorTicketPrice;

    // Getter and Setter methods
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getDirector() {
        return director;
    }

    public void setDirector(String director) {
        this.director = director;
    }

    public String getProducer() {
        return producer;
    }

    public void setProducer(String producer) {
        this.producer = producer;
    }

    public String getSynopsis() {
        return synopsis;
    }

    public void setSynopsis(String synopsis) {
        this.synopsis = synopsis;
    }

    public String getTrailerPicture() {
        return trailerPicture;
    }

    public void setTrailerPicture(String trailerPicture) {
        this.trailerPicture = trailerPicture;
    }

    public String getTrailerVideo() {
        return trailerVideo;
    }

    public void setTrailerVideo(String trailerVideo) {
        this.trailerVideo = trailerVideo;
    }

    public MpaaRating getMpaaRating() {
        return mpaaRating;
    }

    public void setMpaaRating(MpaaRating mpaaRating) {
        this.mpaaRating = mpaaRating;
    }

    public boolean isNowShowing() {return nowShowing;}

    public void setNowShowing(boolean nowShowing) {this.nowShowing = nowShowing;}

    public boolean isComingSoon() {return comingSoon;}

    public void setComingSoon(boolean comingSoon) {this.comingSoon = comingSoon;}

    public String getCast() {return cast;}

    public void setCast(String cast) {this.cast = cast;}

    public double getChildTicketPrice() {return childTicketPrice;}

    public void setChildTicketPrice(double childTicketPrice) {this.childTicketPrice = childTicketPrice;}

    public double getAdultTicketPrice() {return adultTicketPrice;}

    public void setAdultTicketPrice(double adultTicketPrice) {this.adultTicketPrice = adultTicketPrice;}

    public double getSeniorTicketPrice() {return seniorTicketPrice;}

    public void setSeniorTicketPrice(double seniorTicketPrice) {this.seniorTicketPrice = seniorTicketPrice;}

}